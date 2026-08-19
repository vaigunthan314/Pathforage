package com.pathforge.controller;

import com.pathforge.dto.LearnerDTO;
import com.pathforge.dto.LearningDNA;
import com.pathforge.model.Learner;
import com.pathforge.service.LearnerService;
import com.pathforge.service.LearningDNAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class LearningDNAController {

    @Autowired
    private LearningDNAService learningDNAService;

    @Autowired
    private LearnerService learnerService;

    @PostMapping("/analyze")
    public ResponseEntity<LearningDNA> analyzeLearner(@RequestBody Map<String, Object> request) {
        // Reuse an existing learner when the request carries an identity —
        // never create an unbounded new row per analyze call.
        Learner learner;
        Number learnerId = request.get("learnerId") instanceof Number ? (Number) request.get("learnerId") : null;
        String authId = (String) request.get("authId");
        if (learnerId != null) {
            learner = learnerService.getLearner(learnerId.longValue());
        } else if (authId != null && !authId.isBlank()) {
            learner = learnerService.getOrCreateByAuthId(authId);
            if (request.get("name") != null) learner.setName((String) request.get("name"));
        } else {
            LearnerDTO dto = new LearnerDTO();
            dto.setName((String) request.getOrDefault("name", "Learner"));
            dto.setGoal((String) request.get("goal"));
            dto.setCurrentLevel((String) request.get("level"));
            dto.setAvailableTime((String) request.get("availableTime"));
            dto.setTargetTimeline((String) request.get("timeline"));
            dto.setLearningStyle((String) request.get("learningStyle"));
            dto.setPriority((String) request.get("priority"));
            learner = learnerService.createLearner(dto);
        }
        LearningDNA dna = learningDNAService.analyzeLearner(learner);
        
        return ResponseEntity.ok(dna);
    }

    @GetMapping("/learning-dna/{learnerId}")
    public ResponseEntity<LearningDNA> getLearningDNA(@PathVariable Long learnerId) {
        LearningDNA dna = learningDNAService.analyzeLearner(learnerId);
        return ResponseEntity.ok(dna);
    }
}
