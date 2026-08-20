package com.pathforge.controller;

import com.pathforge.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ChatController {

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
        String message = (String) request.get("message");
        Number learnerIdNumber = request.get("learnerId") instanceof Number ? (Number) request.get("learnerId") : null;

        SseEmitter emitter = new SseEmitter(120_000L);
        if (message == null || message.isBlank() || learnerIdNumber == null) {
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
        aiService.streamChat(message, learnerIdNumber.longValue(), emitter);
        return emitter;
    }
}
