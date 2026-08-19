package com.pathforge.service;

import com.pathforge.model.Learner;
import com.pathforge.model.LearnerSkill;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AIService {

    // ═══════════════════════════════════════════════════════════════════════
    // Thread safety notes:
    //  - NO per-user state is stored in instance fields. All request data lives
    //    in method locals.
    //  - The RestTemplate is a shared, thread-safe client configured with
    //    explicit connect/read timeouts so a hung upstream never blocks a
    //    Tomcat worker indefinitely.
    //  - The learner-context cache is a bounded ConcurrentHashMap keyed by
    //    learner id — no cross-user state, safe for concurrent access.
    // ═══════════════════════════════════════════════════════════════════════

    private static final int CONNECT_TIMEOUT_MS = 5_000;
    private static final int READ_TIMEOUT_MS = 60_000;
    private static final int STREAM_TIMEOUT_MS = 120_000;
    private static final int CONTEXT_CACHE_MAX = 256;
    private static final long CONTEXT_CACHE_TTL_MS = 10 * 60 * 1000L;

    @Value("${ai.api.key:}")
    private String apiKey;

    @Value("${ai.api.url:https://api.free.ai/v1/chat/completions}")
    private String apiUrl;

    @Value("${ai.api.model:qwen3-8b}")
    private String model;

    @Autowired
    private LearnerService learnerService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate;

    private static final class CachedContext {
        final Map<String, String> context;
        final long expiresAt;
        CachedContext(Map<String, String> context, long expiresAt) {
            this.context = context;
            this.expiresAt = expiresAt;
        }
    }

    private final ConcurrentHashMap<Long, CachedContext> contextCache = new ConcurrentHashMap<>(64);

    public AIService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(CONNECT_TIMEOUT_MS);
        factory.setReadTimeout(READ_TIMEOUT_MS);
        restTemplate = new RestTemplate(factory);
    }

    /**
     * Returns a compact, cached learner context map (career, level, skills, ...).
     * Never sends the full learner profile to the model. Bounded per-learner
     * cache avoids repeated database fetches for every chat message.
     */
    private Map<String, String> getCompactContext(Long learnerId) {
        CachedContext cached = contextCache.get(learnerId);
        if (cached != null && cached.expiresAt > System.currentTimeMillis()) {
            return cached.context;
        }

        Learner learner;
        try {
            learner = learnerService.getLearner(learnerId);
        } catch (RuntimeException e) {
            return null;
        }

        String skills = learner.getCurrentSkills() != null
            ? learner.getCurrentSkills().stream()
                .map(ls -> ls.getSkill().getName())
                .reduce((a, b) -> a + ", " + b)
                .orElse("None") : "None";

        Map<String, String> context = Map.of(
            "name", learner.getName() != null ? learner.getName() : "Learner",
            "career", learner.getGoal() != null ? learner.getGoal() : "not set yet",
            "level", learner.getCurrentLevel() != null ? learner.getCurrentLevel() : "not specified",
            "skills", skills,
            "style", learner.getLearningStyle() != null ? learner.getLearningStyle() : "not specified"
        );

        if (contextCache.size() >= CONTEXT_CACHE_MAX) {
            // Simple bounded eviction: drop expired entries, else clear.
            contextCache.entrySet().removeIf(e -> e.getValue().expiresAt <= System.currentTimeMillis());
            if (contextCache.size() >= CONTEXT_CACHE_MAX) contextCache.clear();
        }
        contextCache.put(learnerId, new CachedContext(context, System.currentTimeMillis() + CONTEXT_CACHE_TTL_MS));
        return context;
    }

    public void invalidateContext(Long learnerId) {
        if (learnerId != null) contextCache.remove(learnerId);
    }

    public String chat(String message, Long learnerId) {
        // Never fabricate a response — if the AI is not reachable, return null
        // so the controller can signal an explicit 503 "temporarily unavailable".
        if (apiKey == null || apiKey.isEmpty()) {
            return null;
        }

        Map<String, String> context = getCompactContext(learnerId);
        if (context == null) return null;

        try {
            return callAIAPI(buildChatPrompt(message, context));
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Streaming chat: pushes SSE text deltas to the emitter. Runs on a
     * detached thread so the Tomcat worker is freed immediately. Only the
     * Gemini-native endpoint supports streaming here; OpenAI-format providers
     * fall back to a single non-streamed response.
     */
    public void streamChat(String message, Long learnerId, SseEmitter emitter) {
        if (apiKey == null || apiKey.isEmpty()) {
            emitter.completeWithError(new IllegalStateException("AI_TUTOR_UNAVAILABLE"));
            return;
        }
        Map<String, String> context = getCompactContext(learnerId);
        if (context == null) {
            emitter.completeWithError(new IllegalStateException("AI_TUTOR_UNAVAILABLE"));
            return;
        }

        boolean gemini = apiUrl != null && apiUrl.contains("generativelanguage.googleapis.com")
                || model != null && model.toLowerCase().startsWith("gemini");

        Thread t = new Thread(() -> {
            try {
                if (gemini) {
                    streamGemini(emitter, buildChatPrompt(message, context));
                } else {
                    String text = callAIAPI(buildChatPrompt(message, context));
                    if (text == null) {
                        emitter.completeWithError(new IllegalStateException("AI_TUTOR_UNAVAILABLE"));
                    } else {
                        emitter.send(SseEmitter.event().data(Map.of("delta", text)));
                        emitter.complete();
                    }
                }
            } catch (Exception e) {
                try {
                    emitter.completeWithError(e);
                } catch (Exception ignored) {
                }
            }
        }, "ai-tutor-stream");
        t.setDaemon(true);
        t.start();
    }

    private void streamGemini(SseEmitter emitter, String prompt) throws Exception {
        String base = apiUrl != null && !apiUrl.isBlank() ? apiUrl
                : "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";
        String url = base.endsWith(":generateContent")
                ? base.replace(":generateContent", ":streamGenerateContent?alt=sse")
                : base + (base.contains("?") ? "&" : "?") + "alt=sse";

        var conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
        conn.setRequestMethod("POST");
        conn.setConnectTimeout(CONNECT_TIMEOUT_MS);
        conn.setReadTimeout(STREAM_TIMEOUT_MS);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("x-goog-api-key", apiKey);
        conn.setDoOutput(true);
        String body = objectMapper.writeValueAsString(Map.of(
            "contents", new Object[]{ Map.of("parts", new Object[]{ Map.of("text", prompt) }) }
        ));
        conn.getOutputStream().write(body.getBytes(StandardCharsets.UTF_8));

        int code = conn.getResponseCode();
        if (code != 200) {
            emitError(emitter);
            return;
        }
        try (InputStream in = conn.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.startsWith("data:")) continue;
                String payload = line.substring(5).trim();
                if (payload.isEmpty() || "[DONE]".equals(payload)) continue;
                try {
                    JsonNode node = objectMapper.readTree(payload);
                    JsonNode text = node.path("candidates").path(0).path("content").path("parts").path(0).path("text");
                    if (!text.isMissingNode() && !text.asText().isEmpty()) {
                        emitter.send(SseEmitter.event().data(Map.of("delta", text.asText())));
                    }
                } catch (Exception sendFailure) {
                    // Client disconnected or stream ended — stop consuming.
                    return;
                }
            }
            emitter.complete();
        }
    }

    private void emitError(SseEmitter emitter) {
        try {
            emitter.completeWithError(new IllegalStateException("AI_TUTOR_UNAVAILABLE"));
        } catch (Exception ignored) {
        }
    }

    private String buildChatPrompt(String message, Map<String, String> ctx) {
        return String.format("""
            You are an AI learning assistant for PathForge AI.

            Learner Context (compact):
            - Name: %s
            - Goal: %s
            - Level: %s
            - Current Skills: %s
            - Learning Style: %s

            The learner is asking: %s

            Provide a helpful response that:
            1. Is concise — aim for 100-200 words unless asked for detail
            2. Uses simple, beginner-friendly language
            3. Includes a small practical example when relevant
            4. Relates the answer to their career goal
            5. Ends with one actionable next step

            If the question is simple (what is X, explain Y), keep it under 100 words.
            If the question asks for detail or code, be thorough but structured.

            Response:""",
            ctx.get("name"), ctx.get("career"), ctx.get("level"),
            ctx.get("skills"), ctx.get("style"), message
        );
    }

    private boolean isGemini() {
        return apiUrl != null && apiUrl.contains("generativelanguage.googleapis.com")
                || model != null && model.toLowerCase().startsWith("gemini");
    }

    private String callAIAPI(String prompt) {
        return isGemini() ? callGeminiAPI(prompt) : callOpenAIAPI(prompt);
    }

    private String callOpenAIAPI(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new java.util.HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", new Object[]{
                Map.of("role", "user", "content", prompt)
            });

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

            if (response.getBody() != null && response.getBody().get("choices") != null) {
                Object choices = response.getBody().get("choices");
                Object first = choices instanceof java.util.List<?> list && !list.isEmpty() ? list.get(0)
                        : choices instanceof Object[] arr && arr.length > 0 ? arr[0] : null;
                if (first != null) {
                    Map choice = (Map) first;
                    Map messageObj = (Map) choice.get("message");
                    if (messageObj != null) {
                        Object text = messageObj.get("content");
                        if (text != null) return text.toString();
                    }
                }
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    private String callGeminiAPI(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-goog-api-key", apiKey);

            String url = apiUrl != null && !apiUrl.isBlank() ? apiUrl
                    : "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";

            Map<String, Object> requestBody = new java.util.HashMap<>();
            requestBody.put("contents", new Object[]{
                Map.of("parts", new Object[]{ Map.of("text", prompt) })
            });

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getBody() != null && response.getBody().get("candidates") != null) {
                Object candidates = response.getBody().get("candidates");
                Object first = candidates instanceof java.util.List<?> list && !list.isEmpty() ? list.get(0)
                        : candidates instanceof Object[] arr && arr.length > 0 ? arr[0] : null;
                if (first != null) {
                    Map candidate = (Map) first;
                    Map content = (Map) candidate.get("content");
                    if (content != null && content.get("parts") != null) {
                        Object parts = content.get("parts");
                        Object part = parts instanceof java.util.List<?> pl && !pl.isEmpty() ? pl.get(0)
                                : parts instanceof Object[] parr && parr.length > 0 ? parr[0] : null;
                        if (part != null) {
                            Object text = ((Map) part).get("text");
                            if (text != null) return text.toString();
                        }
                    }
                }
            }

            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public String generateAssessment(String topic, Learner learner) {
        if (apiKey == null || apiKey.isEmpty()) {
            return getFallbackAssessment(topic);
        }

        try {
            String prompt = String.format("""
                Generate 5 assessment questions for the topic: %s
                
                Learner Level: %s
                Goal: %s
                
                Format the response as a JSON array with objects containing:
                - question: the question text
                - type: "mcq" or "true-false"
                - options: array of options (for mcq)
                - correctAnswer: index of correct answer (for mcq) or boolean (for true-false)
                
                Make questions appropriate for the learner's level.""",
                topic, learner.getCurrentLevel(), learner.getGoal()
            );
            
            return callAIAPI(prompt);
        } catch (Exception e) {
            return getFallbackAssessment(topic);
        }
    }

    private String getFallbackAssessment(String topic) {
        return """
            [
                {
                    "question": "What is the primary purpose of %s?",
                    "type": "mcq",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correctAnswer": 0
                },
                {
                    "question": "%s is essential for cloud computing.",
                    "type": "true-false",
                    "correctAnswer": true
                }
            ]
            """.formatted(topic, topic);
    }
}