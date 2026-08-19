package com.pathforge.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class LearnerDTO {

    private Long id;

    private String authId;

    @NotBlank(message = "Name is required")
    private String name;

    private String email;

    @NotBlank(message = "Goal is required")
    private String goal;

    private String currentLevel;

    private String availableTime;

    private String targetTimeline;

    private String learningStyle;

    private String priority;

    private List<SkillDTO> currentSkills;

    // Constructors
    public LearnerDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthId() { return authId; }
    public void setAuthId(String authId) { this.authId = authId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(String currentLevel) { this.currentLevel = currentLevel; }

    public String getAvailableTime() { return availableTime; }
    public void setAvailableTime(String availableTime) { this.availableTime = availableTime; }

    public String getTargetTimeline() { return targetTimeline; }
    public void setTargetTimeline(String targetTimeline) { this.targetTimeline = targetTimeline; }

    public String getLearningStyle() { return learningStyle; }
    public void setLearningStyle(String learningStyle) { this.learningStyle = learningStyle; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public List<SkillDTO> getCurrentSkills() { return currentSkills; }
    public void setCurrentSkills(List<SkillDTO> currentSkills) { this.currentSkills = currentSkills; }
}
