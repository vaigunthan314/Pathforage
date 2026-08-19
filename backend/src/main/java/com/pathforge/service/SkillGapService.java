package com.pathforge.service;

import com.pathforge.dto.SkillGap;
import com.pathforge.model.Learner;
import com.pathforge.model.LearnerSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class SkillGapService {

    @Autowired
    private LearnerService learnerService;

    // Immutable static reference data (career -> required skills). Written once
    // at class init, never mutated after startup, safe for concurrent reads.
    private static final Map<String, Map<String, Integer>> CAREER_SKILL_REQUIREMENTS;

    static {
        Map<String, Map<String, Integer>> requirements = new LinkedHashMap<>();

        // Cloud Engineer requirements
        Map<String, Integer> cloudEngineer = new LinkedHashMap<>();
        cloudEngineer.put("Python", 80);
        cloudEngineer.put("Git", 70);
        cloudEngineer.put("Linux", 85);
        cloudEngineer.put("Networking", 85);
        cloudEngineer.put("AWS", 90);
        cloudEngineer.put("Docker", 75);
        cloudEngineer.put("Kubernetes", 65);
        cloudEngineer.put("CI/CD", 70);
        requirements.put("cloud engineer", Collections.unmodifiableMap(cloudEngineer));

        // DevOps Engineer requirements
        Map<String, Integer> devopsEngineer = new LinkedHashMap<>();
        devopsEngineer.put("Linux", 90);
        devopsEngineer.put("Docker", 85);
        devopsEngineer.put("Kubernetes", 80);
        devopsEngineer.put("CI/CD", 85);
        devopsEngineer.put("AWS", 80);
        devopsEngineer.put("Terraform", 75);
        devopsEngineer.put("Git", 80);
        devopsEngineer.put("Python", 70);
        requirements.put("devops engineer", Collections.unmodifiableMap(devopsEngineer));

        // Full Stack Developer requirements
        Map<String, Integer> fullStack = new LinkedHashMap<>();
        fullStack.put("JavaScript", 85);
        fullStack.put("React", 80);
        fullStack.put("Node.js", 75);
        fullStack.put("SQL", 70);
        fullStack.put("HTML", 80);
        fullStack.put("CSS", 80);
        fullStack.put("Git", 75);
        requirements.put("full stack developer", Collections.unmodifiableMap(fullStack));

        // AI/ML Engineer requirements
        Map<String, Integer> aiMl = new LinkedHashMap<>();
        aiMl.put("Python", 90);
        aiMl.put("Machine Learning", 85);
        aiMl.put("SQL", 70);
        aiMl.put("AWS", 70);
        aiMl.put("Docker", 65);
        requirements.put("ai/ml engineer", Collections.unmodifiableMap(aiMl));

        // Cybersecurity Analyst requirements
        Map<String, Integer> cyberSecurity = new LinkedHashMap<>();
        cyberSecurity.put("Linux", 85);
        cyberSecurity.put("Networking", 90);
        cyberSecurity.put("Python", 70);
        cyberSecurity.put("SQL", 65);
        requirements.put("cybersecurity analyst", Collections.unmodifiableMap(cyberSecurity));

        CAREER_SKILL_REQUIREMENTS = Collections.unmodifiableMap(requirements);
    }

    public List<SkillGap> analyzeSkillGaps(Long learnerId) {
        Learner learner = learnerService.getLearner(learnerId);
        return analyzeSkillGaps(learner);
    }

    public List<SkillGap> analyzeSkillGaps(Learner learner) {
        List<SkillGap> gaps = new ArrayList<>();
        
        String goal = learner.getGoal();
        if (goal == null) return gaps;
        
        Map<String, Integer> requirements = CAREER_SKILL_REQUIREMENTS.get(goal.toLowerCase());
        if (requirements == null) {
            // Default requirements
            requirements = getDefaultRequirements();
        }

        // Get learner's current skills
        Map<String, Integer> currentSkills = new HashMap<>();
        if (learner.getCurrentSkills() != null) {
            for (LearnerSkill skill : learner.getCurrentSkills()) {
                currentSkills.put(skill.getSkill().getName(), skill.getLevel());
            }
        }

        // Calculate gaps
        for (Map.Entry<String, Integer> entry : requirements.entrySet()) {
            String skillName = entry.getKey();
            int required = entry.getValue();
            int current = currentSkills.getOrDefault(skillName, 0);
            
            gaps.add(new SkillGap(skillName, current, required));
        }

        // Sort by priority (critical first)
        gaps.sort((a, b) -> {
            int priorityOrder = getPriorityOrder(a.getPriority()) - getPriorityOrder(b.getPriority());
            if (priorityOrder != 0) return priorityOrder;
            return b.getGap() - a.getGap();
        });

        return gaps;
    }

    private int getPriorityOrder(String priority) {
        switch (priority) {
            case "critical": return 0;
            case "high": return 1;
            case "medium": return 2;
            case "low": return 3;
            default: return 4;
        }
    }

    private Map<String, Integer> getDefaultRequirements() {
        Map<String, Integer> defaults = new java.util.LinkedHashMap<>();
        defaults.put("Problem Solving", 80);
        defaults.put("Communication", 75);
        return defaults;
    }
}
