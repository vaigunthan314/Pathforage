package com.pathforge.controller;

import com.pathforge.service.AIService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, Object> request) {
        String message = (String) request.get("message");
        // learnerId must identify the caller — never fall back to an arbitrary
        // learner (e.g. id 1), which would leak another user's context.
        Number learnerIdNumber = request.get("learnerId") instanceof Number ? (Number) request.get("learnerId") : null;
        if (message == null || message.isBlank() || learnerIdNumber == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "message and learnerId are required"));
        }

        String response = aiService.chat(message, learnerIdNumber.longValue());

        if (response == null) {
            return ResponseEntity.status(503).body(Map.of(
                "error", "AI Tutor is temporarily unavailable. Please try again later."
            ));
        }

        return ResponseEntity.ok(Map.of(
            "role", "assistant",
            "content", response
        ));
    }

    @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamChat(@RequestBody Map<String, Object> request) {
        long start = System.currentTimeMillis();
        String message = (String) request.get("message");
        Object rawLearnerId = request.get("learnerId");
        Number learnerIdNumber = rawLearnerId instanceof Number ? (Number) rawLearnerId : null;

        log.info("[chat/stream] Request received — message length={}, learnerId type={}, learnerId value={}",
                message != null ? message.length() : 0,
                rawLearnerId != null ? rawLearnerId.getClass().getSimpleName() : "null",
                rawLearnerId instanceof Number ? learnerIdNumber.longValue() : String.valueOf(rawLearnerId));

        SseEmitter emitter = new SseEmitter(120_000L);
        if (message == null || message.isBlank() || learnerIdNumber == null) {
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
        try {
            aiService.streamChat(message, learnerIdNumber.longValue(), emitter);
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
}
