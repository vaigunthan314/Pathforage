package com.pathforge.controller;

import com.pathforge.service.AIService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Diagnostic endpoint for the AI Tutor provider chain.
 * Reports ONLY non-secret status flags: key presence (boolean), configured
 * model id, provider URL host, and the result of a live non-streaming Groq
 * test call ("Hello") with HTTP status / sanitized error.
 * Never returns or logs API keys, auth headers, or tokens.
 */
@RestController
public class AiHealthController {

    private static final Logger log = LoggerFactory.getLogger(AiHealthController.class);

    @Autowired
    private AIService aiService;

    @GetMapping({"/ai-health", "/api/ai-health"})
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("groqKeyPresent", aiService.isGroqKeyPresent());
        status.put("groqModel", aiService.getGroqModel());
        status.put("groqUrlHost", aiService.getGroqUrlHost());
        status.put("fallbackKeyPresent", aiService.isFallbackKeyPresent());

        Map<String, Object> probe = aiService.probeGroq("Hello");
        status.put("groqProbe", probe);

        log.info("[ai-health] groqKeyPresent={}, groqModel={}, probeStatus={}",
                status.get("groqKeyPresent"), status.get("groqModel"), probe.get("status"));
        return ResponseEntity.ok(status);
    }
}
