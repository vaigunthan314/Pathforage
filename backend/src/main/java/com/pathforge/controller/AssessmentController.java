package com.pathforge.controller;

import com.pathforge.model.Assessment;
import com.pathforge.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/generate")
    public ResponseEntity<Assessment> generateAssessment(@RequestBody Map<String, Object> request) {
        String topic = (String) request.get("topic");
        Long learnerId = ((Number) request.get("learnerId")).longValue();
        
        Assessment assessment = assessmentService.generateAssessment(topic, learnerId);
        return ResponseEntity.ok(assessment);
    }

    @PostMapping("/submit")
    public ResponseEntity<Assessment> submitAssessment(@RequestBody Map<String, Object> request) {
        Long assessmentId = ((Number) request.get("assessmentId")).longValue();
        @SuppressWarnings("unchecked")
        Map<String, String> answers = (Map<String, String>) request.get("answers");
        
        Assessment assessment = assessmentService.submitAssessment(assessmentId, answers);
        return ResponseEntity.ok(assessment);
    }

    @GetMapping("/history/{learnerId}")
    public ResponseEntity<?> getAssessmentHistory(@PathVariable Long learnerId) {
        return ResponseEntity.ok(assessmentService.getLearnerAssessments(learnerId));
    }
}
