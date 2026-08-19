package com.pathforge.service;

import com.pathforge.dto.LearningDNA;
import com.pathforge.dto.SkillDTO;
import com.pathforge.model.Learner;
import com.pathforge.model.LearnerSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LearningDNAService {

    @Autowired
    private LearnerService learnerService;

    public LearningDNA analyzeLearner(Long learnerId) {
        Learner learner = learnerService.getLearner(learnerId);
        return analyzeLearner(learner);
    }

    public LearningDNA analyzeLearner(Learner learner) {
        LearningDNA dna = new LearningDNA();
        
        dna.setGoal(learner.getGoal());
        dna.setLevel(learner.getCurrentLevel());
        dna.setWeeklyCommitment(learner.getAvailableTime());
        
        // Determine learning style
        String style = learner.getLearningStyle();
        if (style == null || style.isEmpty()) {
            style = "Mixed";
        }
        dna.setLearningStyle(style);

        // Analyze strengths and growth areas
        List<String> strengths = new ArrayList<>();
        List<String> growthAreas = new ArrayList<>();
        
        if (learner.getCurrentSkills() != null) {
            for (LearnerSkill skill : learner.getCurrentSkills()) {
                if (skill.getLevel() >= 70) {
                    strengths.add(skill.getSkill().getName());
                } else if (skill.getLevel() < 50) {
                    growthAreas.add(skill.getSkill().getName());
                }
            }
        }
        
        // Add default growth areas based on goal
        if (growthAreas.isEmpty()) {
            growthAreas = getDefaultGrowthAreas(learner.getGoal());
        }
        
        dna.setStrengths(strengths);
        dna.setGrowthAreas(growthAreas);

        // Determine learning velocity based on level and time
        String velocity = determineVelocity(learner.getCurrentLevel(), learner.getAvailableTime());
        dna.setLearningVelocity(velocity);

        // Calculate recommended learning mix
        LearningDNA.LearningMix mix = calculateLearningMix(learner);
        dna.setRecommendedStyle(mix);

        return dna;
    }

    private String determineVelocity(String level, String availableTime) {
        if (level == null || availableTime == null) return "Moderate";
        
        int hoursPerDay = parseHours(availableTime);
        
        if (level.equalsIgnoreCase("Advanced") && hoursPerDay >= 3) {
            return "Fast";
        } else if (level.equalsIgnoreCase("Beginner") && hoursPerDay <= 1) {
            return "Steady";
        } else {
            return "Moderate";
        }
    }

    private int parseHours(String timeString) {
        if (timeString == null) return 1;
        
        try {
            if (timeString.contains("3+")) return 3;
            String num = timeString.replaceAll("[^0-9]", "");
            return Integer.parseInt(num);
        } catch (Exception e) {
            return 1;
        }
    }

    private LearningDNA.LearningMix calculateLearningMix(Learner learner) {
        int practical = 60;
        int theory = 30;
        int assessment = 10;

        String style = learner.getLearningStyle();
        if (style != null) {
            style = style.toLowerCase();
            if (style.contains("hands-on") || style.contains("projects")) {
                practical = 75;
                theory = 15;
                assessment = 10;
            } else if (style.contains("reading") || style.contains("videos")) {
                practical = 40;
                theory = 45;
                assessment = 15;
            } else if (style.contains("quizzes")) {
                practical = 50;
                theory = 20;
                assessment = 30;
            }
        }

        return new LearningDNA.LearningMix(practical, theory, assessment);
    }

    private List<String> getDefaultGrowthAreas(String goal) {
        List<String> growthAreas = new ArrayList<>();
        
        if (goal == null) return growthAreas;
        
        switch (goal.toLowerCase()) {
            case "cloud engineer":
            case "devops engineer":
                growthAreas.addAll(List.of("Networking", "AWS", "Docker", "Kubernetes"));
                break;
            case "full stack developer":
                growthAreas.addAll(List.of("JavaScript", "React", "Node.js", "SQL"));
                break;
            case "ai/ml engineer":
                growthAreas.addAll(List.of("Python", "Machine Learning", "TensorFlow"));
                break;
            case "cybersecurity analyst":
                growthAreas.addAll(List.of("Linux", "Networking", "Security"));
                break;
            default:
                growthAreas.addAll(List.of("Problem Solving", "Communication"));
        }
        
        return growthAreas;
    }
}
