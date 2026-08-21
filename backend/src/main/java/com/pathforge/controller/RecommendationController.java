package com.pathforge.controller;

import com.pathforge.model.Course;
import com.pathforge.model.Project;
import com.pathforge.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/recommendations/{learnerId}")
    public ResponseEntity<List<Course>> getRecommendations(@PathVariable Long learnerId) {
        List<Course> recommendations = recommendationService.getRecommendations(learnerId);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/projects/{learnerId}")
    public ResponseEntity<List<Project>> getProjectRecommendations(@PathVariable Long learnerId) {
        List<Project> projects = recommendationService.getProjectRecommendations(learnerId);
        return ResponseEntity.ok(projects);
    }
}
