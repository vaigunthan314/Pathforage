package com.pathforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "learners")
public class Learner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Optimistic lock — prevents silent lost updates when two requests mutate
    // the same learner concurrently (Hibernate retries are NOT automatic; the
    // caller receives ObjectOptimisticLockingFailureException, surfaced as 409).
    @JsonIgnore
    @Version
    private Long version;

    private String name;

    private String email;

    private String authId;

    private String goal;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String profileData;

    private String currentLevel;

    private String availableTime;

    private String targetTimeline;

    private String learningStyle;

    private String priority;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "learner_id")
    private List<LearnerSkill> currentSkills = new ArrayList<>();

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Learner() {}

    public Learner(String name, String email, String goal) {
        this.name = name;
        this.email = email;
        this.goal = goal;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAuthId() { return authId; }
    public void setAuthId(String authId) { this.authId = authId; }

    public String getProfileData() { return profileData; }
    public void setProfileData(String profileData) { this.profileData = profileData; }

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

    public List<LearnerSkill> getCurrentSkills() { return currentSkills; }
    public void setCurrentSkills(List<LearnerSkill> currentSkills) { this.currentSkills = currentSkills; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
