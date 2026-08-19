package com.pathforge.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learner_id", nullable = false)
    private Learner learner;

    private String topic;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer score;

    private String masteryLevel; // mastered, developing, needs-work

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id")
    private List<AssessmentQuestion> questions = new ArrayList<>();

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        startedAt = LocalDateTime.now();
    }

    // Constructors
    public Assessment() {}

    public Assessment(Learner learner, String topic, Integer totalQuestions) {
        this.learner = learner;
        this.topic = topic;
        this.totalQuestions = totalQuestions;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Learner getLearner() { return learner; }
    public void setLearner(Learner learner) { this.learner = learner; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public String getMasteryLevel() { return masteryLevel; }
    public void setMasteryLevel(String masteryLevel) { this.masteryLevel = masteryLevel; }

    public List<AssessmentQuestion> getQuestions() { return questions; }
    public void setQuestions(List<AssessmentQuestion> questions) { this.questions = questions; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }

    public void complete(Integer correctAnswers, Integer score) {
        this.correctAnswers = correctAnswers;
        this.score = score;
        this.completedAt = LocalDateTime.now();
        
        if (score >= 80) {
            this.masteryLevel = "mastered";
        } else if (score >= 60) {
            this.masteryLevel = "developing";
        } else {
            this.masteryLevel = "needs-work";
        }
    }
}
