package com.pathforge.controller;

import com.pathforge.dto.RoadmapDTO;
import com.pathforge.model.Roadmap;
import com.pathforge.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @PostMapping("/generate")
    public ResponseEntity<RoadmapDTO> generateRoadmap(@RequestBody Map<String, Long> request) {
        Long learnerId = request.get("learnerId");
        Roadmap roadmap = roadmapService.generateRoadmap(learnerId);
        return ResponseEntity.ok(roadmapService.convertToDTO(roadmap));
    }

    @GetMapping("/{learnerId}")
    public ResponseEntity<RoadmapDTO> getRoadmap(@PathVariable Long learnerId) {
        Roadmap roadmap = roadmapService.getActiveRoadmap(learnerId);
        if (roadmap == null) {
            roadmap = roadmapService.generateRoadmap(learnerId);
        }
        return ResponseEntity.ok(roadmapService.convertToDTO(roadmap));
    }

    @PostMapping("/recalculate")
    public ResponseEntity<RoadmapDTO> recalculateRoadmap(@RequestBody Map<String, Long> request) {
        Long learnerId = request.get("learnerId");
        Roadmap roadmap = roadmapService.recalculateRoadmap(learnerId);
        return ResponseEntity.ok(roadmapService.convertToDTO(roadmap));
    }
}
