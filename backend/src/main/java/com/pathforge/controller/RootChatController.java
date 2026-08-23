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

/**
 * Root-level chat endpoints (no /api prefix).
 *
 * The frontend's VITE_API_URL is set to the backend base URL without /api,
 * so requests arrive at /chat and /chat/stream instead of /api/chat and
 * /api/chat/stream. This controller handles the root-level paths and
 * delegates to the shared AIService logic.
 */
@RestController
public class RootChatController {

    private static final Logger log = LoggerFactory.getLogger(RootChatController.class);

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, Object> request) {
        Map<String, String> result = aiService.handleChat(
            (String) request.get("message"),
            request.get("learnerId")
        );
        if (result.containsKey("error")) {
            boolean notFound = result.get("error").contains("not found");
            return ResponseEntity.status(notFound ? 404 : 400).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamChat(@RequestBody Map<String, Object> request) {
        return aiService.handleStreamChat(
            (String) request.get("message"),
            request.get("learnerId")
        );
    }
}
