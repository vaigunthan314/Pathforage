package com.pathforge.controller;

import com.pathforge.dto.SkillGap;
import com.pathforge.service.SkillGapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skill-gap")
public class SkillGapController {

    @Autowired
    private SkillGapService skillGapService;

    @GetMapping("/{learnerId}")
    public ResponseEntity<List<SkillGap>> getSkillGaps(@PathVariable Long learnerId) {
        List<SkillGap> gaps = skillGapService.analyzeSkillGaps(learnerId);
        return ResponseEntity.ok(gaps);
    }
}
