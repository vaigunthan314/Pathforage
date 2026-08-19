package com.pathforge.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Version
    private Long version;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learner_id", nullable = false)
    private Learner learner;

    private Integer overallProgress;

    private Integer currentStreak;

    private Integer hoursLearned;

    private Integer skillsMastered;

    private Integer projectsCompleted;

    private Integer assessmentScore;

    private Integer roadmapCompletion;

    private LocalDateTime lastActivityAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        overallProgress = 0;
        currentStreak = 0;
        hoursLearned = 0;
        skillsMastered = 0;
        projectsCompleted = 0;
        assessmentScore = 0;
        roadmapCompletion = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Progress() {}

    public Progress(Learner learner) {
        this.learner = learner;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    /**
     * WRITE_ONLY: the lazy Hibernate proxy for the owner must never be
     * serialized into API responses (proxy crash under concurrent access),
     * but clients may still send the learner when updating progress.
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Learner getLearner() { return learner; }
    public void setLearner(Learner learner) { this.learner = learner; }

    public Integer getOverallProgress() { return overallProgress; }
    public void setOverallProgress(Integer overallProgress) { this.overallProgress = overallProgress; }

    public Integer getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(Integer currentStreak) { this.currentStreak = currentStreak; }

    public Integer getHoursLearned() { return hoursLearned; }
    public void setHoursLearned(Integer hoursLearned) { this.hoursLearned = hoursLearned; }

    public Integer getSkillsMastered() { return skillsMastered; }
    public void setSkillsMastered(Integer skillsMastered) { this.skillsMastered = skillsMastered; }

    public Integer getProjectsCompleted() { return projectsCompleted; }
    public void setProjectsCompleted(Integer projectsCompleted) { this.projectsCompleted = projectsCompleted; }

    public Integer getAssessmentScore() { return assessmentScore; }
    public void setAssessmentScore(Integer assessmentScore) { this.assessmentScore = assessmentScore; }

    public Integer getRoadmapCompletion() { return roadmapCompletion; }
    public void setRoadmapCompletion(Integer roadmapCompletion) { this.roadmapCompletion = roadmapCompletion; }

    public LocalDateTime getLastActivityAt() { return lastActivityAt; }
    public void setLastActivityAt(LocalDateTime lastActivityAt) { this.lastActivityAt = lastActivityAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void recordActivity() {
        this.lastActivityAt = LocalDateTime.now();
        this.currentStreak++;
    }
}
