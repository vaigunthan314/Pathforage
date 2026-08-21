package com.pathforge.controller;

import com.pathforge.dto.LearnerDTO;
import com.pathforge.model.Learner;
import com.pathforge.service.AIService;
import com.pathforge.service.LearnerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/learners")
public class LearnerController {

    @Autowired
    private LearnerService learnerService;

    @Autowired
    private AIService aiService;

    @PostMapping
    public ResponseEntity<LearnerDTO> createLearner(@Valid @RequestBody LearnerDTO learnerDTO) {
        Learner learner = learnerService.createLearner(learnerDTO);
        return ResponseEntity.ok(learnerService.convertToDTO(learner));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearnerDTO> getLearner(@PathVariable Long id) {
        Learner learner = learnerService.getLearner(id);
        return ResponseEntity.ok(learnerService.convertToDTO(learner));
    }

    @GetMapping("/auth/{authId}")
    public ResponseEntity<Learner> getByAuthId(@PathVariable String authId) {
        Learner learner = learnerService.getOrCreateByAuthId(authId);
        return ResponseEntity.ok(learner);
    }

    @PutMapping("/auth/{authId}")
    public ResponseEntity<Learner> updateByAuthId(@PathVariable String authId, @RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        String email = (String) body.get("email");
        String profileData = body.get("profileData") != null ? body.get("profileData").toString() : null;
        Learner learner = learnerService.updateProfileByAuthId(authId, name, email, profileData);
        // Cached AI context belongs to the previous profile version — drop it.
        aiService.invalidateContext(learner.getId());
        return ResponseEntity.ok(learner);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearnerDTO> updateLearner(@PathVariable Long id, @Valid @RequestBody LearnerDTO learnerDTO) {
        Learner updated = learnerService.updateLearner(id, learnerDTO);
        return ResponseEntity.ok(learnerService.convertToDTO(updated));
    }
}
