package com.pathforge.service;

import com.pathforge.model.Learner;
import com.pathforge.model.LearnerSkill;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import jakarta.annotation.PostConstruct;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    @PostConstruct
    public void logProviderStatus() {
        log.info("AI Tutor provider status: Groq available={}, Fallback available={}",
                isGroqAvailable(), isGeminiAvailable());
        if (!isGroqAvailable() && !isGeminiAvailable()) {
            log.error("NO AI PROVIDER CONFIGURED. Set GROQ_API_KEY (or AI_API_KEY) "
                    + "as a Render environment variable. AI Tutor will return 503.");
        }
    }

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

    // ── Groq (primary provider) ──────────────────────────────────────────
    @Value("${groq.api.key:}")
    private String groqApiKey;

    @Value("${groq.api.url:https://api.groq.com/openai/v1/chat/completions}")
    private String groqApiUrl;

    @Value("${groq.api.model:llama-3.3-70b-versatile}")
    private String groqModel;

    // ── Gemini / legacy fallback ─────────────────────────────────────────
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

    // ═══════════════════════════════════════════════════════════════════════
    // PROVIDER RESOLUTION — Groq is primary; Gemini/legacy is fallback.
    // ═══════════════════════════════════════════════════════════════════════

    private boolean isGroqAvailable() {
        return groqApiKey != null && !groqApiKey.isBlank();
    }

    private boolean isGeminiAvailable() {
        return apiKey != null && !apiKey.isBlank();
    }

    private boolean isGeminiNative() {
        return apiUrl != null && apiUrl.contains("generativelanguage.googleapis.com")
                || model != null && model.toLowerCase().startsWith("gemini");
    }

    /**
     * Returns true when the given URL/model pair points to the Gemini native API
     * (not an OpenAI-compatible gateway).
     */
    private boolean isGeminiNative(String url, String mdl) {
        return url != null && url.contains("generativelanguage.googleapis.com")
                || mdl != null && mdl.toLowerCase().startsWith("gemini");
    }

    // ═══════════════════════════════════════════════════════════════════════
    // LEARNER CONTEXT — cached, per-learner, thread-safe.
    // ═══════════════════════════════════════════════════════════════════════

    private Map<String, String> getCompactContext(Long learnerId) {
        CachedContext cached = contextCache.get(learnerId);
        if (cached != null && cached.expiresAt > System.currentTimeMillis()) {
            return cached.context;
        }

        Learner learner;
        try {
            learner = learnerService.getLearner(learnerId);
        } catch (RuntimeException e) {
            log.warn("[getCompactContext] Learner lookup failed for id={}: {}", learnerId, e.getMessage());
            return null;
        }

        try {
            String skills = learner.getCurrentSkills() != null
                ? learner.getCurrentSkills().stream()
                    .filter(ls -> ls.getSkill() != null)
                    .map(ls -> ls.getSkill().getName())
                    .filter(name -> name != null)
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
                contextCache.entrySet().removeIf(e -> e.getValue().expiresAt <= System.currentTimeMillis());
                if (contextCache.size() >= CONTEXT_CACHE_MAX) contextCache.clear();
            }
            contextCache.put(learnerId, new CachedContext(context, System.currentTimeMillis() + CONTEXT_CACHE_TTL_MS));
            return context;
        } catch (Exception e) {
            log.error("[getCompactContext] Failed to build context for learnerId={}: class={}, message={}",
                    learnerId, e.getClass().getSimpleName(), e.getMessage());
            return null;
        }
    }

    public void invalidateContext(Long learnerId) {
        if (learnerId != null) contextCache.remove(learnerId);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC VALIDATION + DISPATCH — called by ChatController (both /api and root)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Resolve a learnerId (numeric DB id OR Firebase UID string) to a Learner.
     * Returns null if not found.
     */
    private Learner resolveLearner(Object rawLearnerId) {
        if (rawLearnerId == null) return null;
        try {
            if (rawLearnerId instanceof Number n) {
                return learnerService.getLearner(n.longValue());
            }
            String strId = rawLearnerId.toString().trim();
            if (strId.isEmpty()) return null;
            // If it looks like a numeric string, try DB id first
            try {
                long numericId = Long.parseLong(strId);
                return learnerService.getLearner(numericId);
            } catch (NumberFormatException ignored) {
                // Not numeric — treat as Firebase UID (authId)
            }
            return learnerService.getOrCreateByAuthId(strId);
        } catch (Exception e) {
            log.warn("[resolveLearner] Failed to resolve learnerId={}: {}", rawLearnerId, e.getMessage());
            return null;
        }
    }

    /**
     * Validate and dispatch a streaming chat request. Returns the emitter after
     * kicking off the background thread. Controllers call this so they never
     * duplicate validation or streaming logic.
     */
    public SseEmitter handleStreamChat(String message, Object rawLearnerId) {
        long start = System.currentTimeMillis();

        log.info("[chat/stream] Request received — message length={}, learnerId type={}, learnerId value={}",
                message != null ? message.length() : 0,
                rawLearnerId != null ? rawLearnerId.getClass().getSimpleName() : "null",
                rawLearnerId);

        SseEmitter emitter = new SseEmitter(120_000L);
        if (message == null || message.isBlank() || rawLearnerId == null
                || (rawLearnerId instanceof String s && s.isBlank())) {
            log.warn("[chat/stream] Validation failed — message blank={}, learnerId present={}",
                    message == null || message.isBlank(), rawLearnerId != null);
            try {
                emitter.send(SseEmitter.event().data(Map.of(
                    "success", false,
                    "message", "message and learnerId are required"
                )));
            } catch (Exception ignored) {
            }
            emitter.complete();
            return emitter;
        }

        Learner learner = resolveLearner(rawLearnerId);
        if (learner == null) {
            log.warn("[chat/stream] Learner not found for learnerId={}", rawLearnerId);
            try {
                emitter.send(SseEmitter.event().data(Map.of(
                    "success", false,
                    "message", "Learner profile not found. Please complete onboarding first."
                )));
            } catch (Exception ignored) {
            }
            emitter.complete();
            return emitter;
        }

        try {
            streamChat(message, learner.getId(), emitter);
        } catch (Exception e) {
            log.error("[chat/stream] Exception on request thread — class={}, message={}, root cause={}: {}",
                    e.getClass().getSimpleName(), e.getMessage(),
                    e.getCause() != null ? e.getCause().getClass().getSimpleName() : "none",
                    e.getCause() != null ? e.getCause().getMessage() : "none", e);
            try {
                emitter.send(SseEmitter.event().data(Map.of(
                    "success", false,
                    "message", "AI service temporarily unavailable"
                )));
                emitter.complete();
            } catch (Exception ignored) {
            }
        }
        log.info("[chat/stream] Request handled in {}ms", System.currentTimeMillis() - start);
        return emitter;
    }

    /**
     * Validate and dispatch a non-streaming chat request. Used by both
     * ChatController (/api/chat) and RootChatController (/chat).
     */
    public Map<String, String> handleChat(String message, Object rawLearnerId) {
        if (message == null || message.isBlank() || rawLearnerId == null
                || (rawLearnerId instanceof String s && s.isBlank())) {
            return Map.of("error", "message and learnerId are required");
        }

        Learner learner = resolveLearner(rawLearnerId);
        if (learner == null) {
            return Map.of("error", "Learner profile not found. Please complete onboarding first.");
        }

        String response = chat(message, learner.getId());
        if (response == null) {
            return Map.of("error", "AI Tutor is temporarily unavailable. Please try again later.");
        }
        return Map.of("role", "assistant", "content", response);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // NON-STREAMING CHAT — Groq primary, Gemini fallback.
    // ═══════════════════════════════════════════════════════════════════════

    public String chat(String message, Long learnerId) {
        long start = System.currentTimeMillis();
        log.info("[chat] Request — learnerId={}, message length={}", learnerId, message != null ? message.length() : 0);
        Map<String, String> context = getCompactContext(learnerId);
        if (context == null) {
            log.warn("[chat] Learner context not found for learnerId={}", learnerId);
            return null;
        }

        String prompt = buildChatPrompt(message, context);

        // ── Attempt 1: Groq ──────────────────────────────────────────────
        if (isGroqAvailable()) {
            try {
                String result = callOpenAICompatibleAPI(groqApiKey, groqApiUrl, groqModel, prompt);
                if (result != null) {
                    log.info("[chat] Groq succeeded in {}ms", System.currentTimeMillis() - start);
                    return result;
                }
            } catch (Exception e) {
                log.warn("[chat] Groq failed — class={}, message={}", e.getClass().getSimpleName(), e.getMessage());
            }
        }

        // ── Attempt 2: Gemini / legacy fallback ──────────────────────────
        if (isGeminiAvailable()) {
            try {
                String result = callAIAPI(prompt);
                if (result != null) {
                    log.info("[chat] Gemini fallback succeeded in {}ms", System.currentTimeMillis() - start);
                    return result;
                }
            } catch (Exception e) {
                log.warn("[chat] Gemini fallback also failed — class={}, message={}", e.getClass().getSimpleName(), e.getMessage());
            }
        }

        log.warn("[chat] All providers failed for learnerId={} in {}ms", learnerId, System.currentTimeMillis() - start);
        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STREAMING CHAT — Groq primary (OpenAI SSE), Gemini native fallback.
    // ═══════════════════════════════════════════════════════════════════════

    public void streamChat(String message, Long learnerId, SseEmitter emitter) {
        long start = System.currentTimeMillis();
        log.info("[streamChat] Provider selected: groq={}", isGroqAvailable());

        Map<String, String> context = getCompactContext(learnerId);
        if (context == null) {
            log.warn("[streamChat] Learner context not found for learnerId={}", learnerId);
            emitError(emitter, "AI service temporarily unavailable");
            return;
        }

        String prompt = buildChatPrompt(message, context);
        log.info("[streamChat] Prompt built — length={}, career={}, level={}",
                prompt.length(), context.get("career"), context.get("level"));

        Thread t = new Thread(() -> {
            try {
                // ── Attempt 1: Groq streaming (OpenAI-compatible SSE) ─────────
                if (isGroqAvailable()) {
                    try {
                        log.info("[streamChat] Attempting Groq streaming — model={}", groqModel);
                        streamOpenAICompatible(emitter, groqApiKey, groqApiUrl, groqModel, prompt);
                        log.info("[streamChat] Groq stream completed in {}ms", System.currentTimeMillis() - start);
                        return;
                    } catch (Exception e) {
                        log.warn("[streamChat] Groq stream EXCEPTION — class={}, message={}, root={}: {}",
                                e.getClass().getSimpleName(), e.getMessage(),
                                e.getCause() != null ? e.getCause().getClass().getSimpleName() : "none",
                                e.getCause() != null ? e.getCause().getMessage() : "none");
                    }
                } else {
                    log.warn("[streamChat] Groq not available — skipping");
                }

                // ── Attempt 2: Gemini native streaming ───────────────────────
                if (isGeminiAvailable()) {
                    try {
                        log.info("[streamChat] Attempting Gemini fallback streaming — model={}", model);
                        if (isGeminiNative(apiUrl, model)) {
                            streamGemini(emitter, prompt);
                        } else {
                            // OpenAI-compatible fallback (legacy free.ai gateway)
                            String text = callOpenAICompatibleAPI(apiKey, apiUrl, model, prompt);
                            if (text == null) {
                                emitError(emitter, "AI service temporarily unavailable");
                            } else {
                                emitter.send(SseEmitter.event().data(Map.of("delta", text)));
                                emitter.complete();
                            }
                        }
                        log.info("[streamChat] Gemini fallback completed in {}ms", System.currentTimeMillis() - start);
                        return;
                    } catch (Exception e) {
                        log.warn("[streamChat] Gemini fallback EXCEPTION — class={}, message={}, root={}: {}",
                                e.getClass().getSimpleName(), e.getMessage(),
                                e.getCause() != null ? e.getCause().getClass().getSimpleName() : "none",
                                e.getCause() != null ? e.getCause().getMessage() : "none");
                    }
                } else {
                    log.warn("[streamChat] Gemini fallback not available");
                }

                log.error("[streamChat] ALL providers failed — no provider succeeded in {}ms", System.currentTimeMillis() - start);
                emitError(emitter, "AI service temporarily unavailable");
            } catch (Exception e) {
                log.error("[streamChat] UNCAUGHT exception in stream thread — class={}, message={}: {}",
                        e.getClass().getSimpleName(), e.getMessage(), e);
                emitError(emitter, "AI service temporarily unavailable");
            }
        }, "ai-tutor-stream");
        t.setDaemon(true);
        t.start();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // OPENAI-COMPATIBLE API (used by Groq and legacy free.ai gateway)
    // ═══════════════════════════════════════════════════════════════════════

    private String callOpenAICompatibleAPI(String key, String url, String mdl, String prompt) {
        long start = System.currentTimeMillis();
        String host = "unknown";
        try {
            host = url != null ? URI.create(url).getHost() : "unknown";
            log.info("[callOpenAI] Request → provider={}, model={}", host, mdl);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(key);

            Map<String, Object> requestBody = new java.util.HashMap<>();
            requestBody.put("model", mdl);
            requestBody.put("messages", new Object[]{
                Map.of("role", "user", "content", prompt)
            });
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2048);
            requestBody.put("enable_thinking", false);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            long elapsed = System.currentTimeMillis() - start;
            log.info("[callOpenAI] Response ← status={}, provider={}, elapsed={}ms", response.getStatusCode(), host, elapsed);

            if (response.getBody() != null && response.getBody().get("choices") != null) {
                Object choices = response.getBody().get("choices");
                Object first = choices instanceof java.util.List<?> list && !list.isEmpty() ? list.get(0)
                        : choices instanceof Object[] arr && arr.length > 0 ? arr[0] : null;
                if (first != null) {
                    Map choice = (Map) first;
                    Map messageObj = (Map) choice.get("message");
                    if (messageObj != null) {
                        Object text = messageObj.get("content");
                        if (text != null) return stripThinkBlocks(text.toString());
                    }
                }
            }
            log.warn("[callOpenAI] No content in response from {}", host);
            return null;
        } catch (Exception e) {
            long elapsed = System.currentTimeMillis() - start;
            log.error("[callOpenAI] FAILED — provider={}, model={}, elapsed={}ms, error={}: {}",
                    host, mdl, elapsed, e.getClass().getSimpleName(), e.getMessage());
            return null;
        }
    }

    /**
     * Streaming via OpenAI-compatible SSE (used by Groq and legacy gateways).
     * Each line is `data: {"choices":[{"delta":{"content":"..."}}]}`.
     */
    private void streamOpenAICompatible(SseEmitter emitter, String key, String url, String mdl, String prompt) throws Exception {
        long start = System.currentTimeMillis();
        String host = url != null ? URI.create(url).getHost() : "unknown";
        log.info("[streamOpenAI] Request started — provider={}, model={}, url={}", host, mdl, url);

        var conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
        conn.setRequestMethod("POST");
        conn.setConnectTimeout(CONNECT_TIMEOUT_MS);
        conn.setReadTimeout(STREAM_TIMEOUT_MS);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + key);
        conn.setDoOutput(true);

        Map<String, Object> requestBody = new java.util.HashMap<>();
        requestBody.put("model", mdl);
        requestBody.put("messages", new Object[]{
            Map.of("role", "user", "content", prompt)
        });
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 2048);
        requestBody.put("stream", true);
        requestBody.put("enable_thinking", false);

        byte[] bodyBytes = objectMapper.writeValueAsBytes(requestBody);
        log.info("[streamOpenAI] Sending request — body size={} bytes", bodyBytes.length);
        conn.getOutputStream().write(bodyBytes);

        int code = conn.getResponseCode();
        long elapsed = System.currentTimeMillis() - start;
        log.info("[streamOpenAI] Response received — provider={}, status={}, elapsed={}ms", host, code, elapsed);

        if (code != 200) {
            try (InputStream errStream = conn.getErrorStream()) {
                if (errStream != null) {
                    String errBody = new String(errStream.readAllBytes(), StandardCharsets.UTF_8);
                    log.error("[streamOpenAI] ERROR body from {} ({} chars): {}", host, errBody.length(),
                            errBody.substring(0, Math.min(errBody.length(), 500)));
                } else {
                    log.error("[streamOpenAI] No error stream from {} for status {}", host, code);
                }
            } catch (Exception e) {
                log.warn("[streamOpenAI] Failed to read error stream: {}", e.getMessage());
            }
            emitError(emitter, "AI service temporarily unavailable");
            return;
        }

        log.info("[streamOpenAI] Reading SSE stream from {}", host);
        try (InputStream in = conn.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
            String line;
            int chunkCount = 0;
            ThinkBlockFilter thinkFilter = new ThinkBlockFilter();
            while ((line = reader.readLine()) != null) {
                if (!line.startsWith("data:")) continue;
                String payload = line.substring(5).trim();
                if (payload.isEmpty() || "[DONE]".equals(payload)) {
                    log.info("[streamOpenAI] Stream done from {} — received {} chunks", host, chunkCount);
                    continue;
                }
                try {
                    JsonNode node = objectMapper.readTree(payload);
                    JsonNode choicesNode = node.path("choices");
                    if (choicesNode.isArray() && choicesNode.size() > 0) {
                        JsonNode delta = choicesNode.get(0).path("delta").path("content");
                        if (!delta.isMissingNode() && !delta.asText().isEmpty()) {
                            String filtered = thinkFilter.filter(delta.asText());
                            if (!filtered.isEmpty()) {
                                emitter.send(SseEmitter.event().data(Map.of("delta", filtered)));
                                chunkCount++;
                            }
                        }
                    }
                } catch (Exception sendFailure) {
                    log.warn("[streamOpenAI] Send failure at chunk {} — client likely disconnected", chunkCount);
                    return;
                }
            }
            long totalElapsed = System.currentTimeMillis() - start;
            log.info("[streamOpenAI] Stream completed — provider={}, chunks={}, total={}ms", host, chunkCount, totalElapsed);
            emitter.complete();
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GEMINI NATIVE API (kept as fallback)
    // ═══════════════════════════════════════════════════════════════════════

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
            String host = apiUrl != null ? URI.create(apiUrl).getHost() : "unknown";
            log.warn("Gemini stream request failed with HTTP {} from {}", code, host);
            emitError(emitter, "AI service temporarily unavailable");
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
                    return;
                }
            }
            emitter.complete();
        }
    }

    private String callAIAPI(String prompt) {
        return isGeminiNative() ? callGeminiAPI(prompt) : callOpenAICompatibleAPI(apiKey, apiUrl, model, prompt);
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
            log.warn("Gemini AI call failed: {}", e.toString());
            return null;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PROMPT BUILDER — shared across all providers.
    // ═══════════════════════════════════════════════════════════════════════

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

    // ═══════════════════════════════════════════════════════════════════════
    // ASSESSMENT GENERATION (kept as-is, uses legacy provider)
    // ═══════════════════════════════════════════════════════════════════════

    public String generateAssessment(String topic, Learner learner) {
        // Try Groq first for assessment generation too
        if (isGroqAvailable()) {
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
                String result = callOpenAICompatibleAPI(groqApiKey, groqApiUrl, groqModel, prompt);
                if (result != null) return result;
            } catch (Exception e) {
                log.warn("Groq assessment generation failed, trying fallback: {}", e.toString());
            }
        }

        // Fallback to legacy provider
        if (isGeminiAvailable()) {
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

        return getFallbackAssessment(topic);
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

    // ═══════════════════════════════════════════════════════════════════════
    // THINK-BLOCK FILTER — strips ...</think>outputs from thinking models (e.g. Qwen).
    // ═══════════════════════════════════════════════════════════════════════

    private static String stripThinkBlocks(String text) {
        if (text == null) return null;
        return text.replaceAll("(?s)<think>.*?</think>", "").trim();
    }

    private static final class ThinkBlockFilter {
        private boolean inThinkBlock = false;

        String filter(String chunk) {
            if (chunk == null || chunk.isEmpty()) return "";
            StringBuilder out = new StringBuilder();
            int i = 0;
            while (i < chunk.length()) {
                if (inThinkBlock) {
                    int closeIdx = chunk.indexOf("</think>", i);
                    if (closeIdx >= 0) {
                        inThinkBlock = false;
                        i = closeIdx + "</think>".length();
                    } else {
                        break;
                    }
                } else {
                    int openIdx = chunk.indexOf("<think>", i);
                    if (openIdx >= 0) {
                        out.append(chunk, i, openIdx);
                        inThinkBlock = true;
                        i = openIdx + "<think>".length();
                    } else {
                        out.append(chunk.substring(i));
                        break;
                    }
                }
            }
            return out.toString();
        }
    }

    private void emitError(SseEmitter emitter, String message) {
        try {
            emitter.send(SseEmitter.event().data(Map.of(
                    "success", false,
                    "message", message
            )));
            emitter.complete();
        } catch (Exception ignored) {
        }
    }
}