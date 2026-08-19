package com.pathforge.service;

import com.pathforge.dto.SkillGap;
import com.pathforge.model.Course;
import com.pathforge.model.Learner;
import com.pathforge.model.Project;
import com.pathforge.repository.CourseRepository;
import com.pathforge.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private LearnerService learnerService;

    @Autowired
    private SkillGapService skillGapService;

    public List<Course> getRecommendations(Long learnerId) {
        Learner learner = learnerService.getLearner(learnerId);
        List<SkillGap> gaps = skillGapService.analyzeSkillGaps(learnerId);
        
        List<Course> allCourses = courseRepository.findAll();
        
        // Score and rank courses
        Map<Course, Double> courseScores = new HashMap<>();
        
        for (Course course : allCourses) {
            double score = calculateRecommendationScore(course, learner, gaps);
            courseScores.put(course, score);
        }
        
        // Sort by score and return top recommendations
        return courseScores.entrySet().stream()
            .sorted(Map.Entry.<Course, Double>comparingByValue().reversed())
            .limit(10)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }

    private double calculateRecommendationScore(Course course, Learner learner, List<SkillGap> gaps) {
        double score = 0;
        
        // Skill match (0.30)
        boolean isGapSkill = gaps.stream()
            .anyMatch(gap -> gap.getSkill().equalsIgnoreCase(course.getSkill()));
        score += isGapSkill ? 0.30 : 0.10;
        
        // Goal match (0.25)
        String goal = learner.getGoal();
        if (goal != null && isRelevantToGoal(course.getSkill(), goal)) {
            score += 0.25;
        }
        
        // Level match (0.15)
        if (course.getLevel() != null && course.getLevel().equalsIgnoreCase(learner.getCurrentLevel())) {
            score += 0.15;
        } else if (course.getLevel() != null && isAppropriateLevel(course.getLevel(), learner.getCurrentLevel())) {
            score += 0.10;
        }
        
        // Prerequisite match (0.15)
        score += 0.15; // Default score for prerequisites
        
        // Time fit (0.10)
        score += 0.10;
        
        // Preference match (0.05)
        score += 0.05;
        
        return score;
    }

    private boolean isRelevantToGoal(String skill, String goal) {
        Map<String, List<String>> goalSkills = new HashMap<>();
        goalSkills.put("cloud engineer", List.of("AWS", "Linux", "Docker", "Kubernetes", "Networking"));
        goalSkills.put("devops engineer", List.of("Docker", "Kubernetes", "CI/CD", "AWS", "Linux"));
        goalSkills.put("full stack developer", List.of("JavaScript", "React", "Node.js", "SQL"));
        goalSkills.put("ai/ml engineer", List.of("Python", "Machine Learning", "TensorFlow"));
        
        List<String> skills = goalSkills.getOrDefault(goal.toLowerCase(), List.of());
        return skills.stream().anyMatch(s -> s.equalsIgnoreCase(skill));
    }

    private boolean isAppropriateLevel(String courseLevel, String learnerLevel) {
        Map<String, Integer> levelOrder = Map.of(
            "beginner", 1,
            "intermediate", 2,
            "advanced", 3
        );
        
        int courseLevelNum = levelOrder.getOrDefault(courseLevel.toLowerCase(), 1);
        int learnerLevelNum = levelOrder.getOrDefault(learnerLevel.toLowerCase(), 1);
        
        return courseLevelNum <= learnerLevelNum + 1;
    }

    public List<Project> getProjectRecommendations(Long learnerId) {
        Learner learner = learnerService.getLearner(learnerId);
        
        List<Project> allProjects = projectRepository.findAll();
        
        // Score and rank projects
        Map<Project, Double> projectScores = new HashMap<>();
        
        for (Project project : allProjects) {
            double score = calculateProjectScore(project, learner);
            projectScores.put(project, score);
        }
        
        return projectScores.entrySet().stream()
            .sorted(Map.Entry.<Project, Double>comparingByValue().reversed())
            .limit(5)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }

    private double calculateProjectScore(Project project, Learner learner) {
        double score = 0;
        
        // Difficulty match
        if (project.getDifficulty() != null) {
            switch (project.getDifficulty().toLowerCase()) {
                case "beginner":
                    score += learner.getCurrentLevel().equalsIgnoreCase("beginner") ? 0.4 : 0.2;
                    break;
                case "intermediate":
                    score += learner.getCurrentLevel().equalsIgnoreCase("intermediate") ? 0.4 : 0.2;
                    break;
                case "advanced":
                    score += learner.getCurrentLevel().equalsIgnoreCase("advanced") ? 0.4 : 0.2;
                    break;
            }
        }
        
        // Stage relevance
        score += 0.3;
        
        // Skill relevance
        score += 0.3;
        
        return score;
    }
}
