package com.pathforge.controller;

import com.pathforge.model.Progress;
import com.pathforge.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/{learnerId}")
    public ResponseEntity<Progress> getProgress(@PathVariable Long learnerId) {
        Progress progress = progressService.getProgress(learnerId);
        return ResponseEntity.ok(progress);
    }

    @PostMapping("/update")
    public ResponseEntity<Progress> updateProgress(@RequestBody Progress progress) {
        Progress updated = progressService.updateProgress(progress.getLearner().getId(), progress);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/activity/{learnerId}")
    public ResponseEntity<Progress> recordActivity(@PathVariable Long learnerId) {
        Progress progress = progressService.recordActivity(learnerId);
        return ResponseEntity.ok(progress);
    }
}
