package com.pathforge.dto;

import java.util.List;

public class LearningDNA {

    private String goal;

    private String level;

    private String learningStyle;

    private String weeklyCommitment;

    private List<String> strengths;

    private List<String> growthAreas;

    private String learningVelocity;

    private LearningMix recommendedStyle;

    // Inner class for learning mix
    public static class LearningMix {
        private Integer practical;
        private Integer theory;
        private Integer assessment;

        public LearningMix() {}

        public LearningMix(Integer practical, Integer theory, Integer assessment) {
            this.practical = practical;
            this.theory = theory;
            this.assessment = assessment;
        }

        public Integer getPractical() { return practical; }
        public void setPractical(Integer practical) { this.practical = practical; }

        public Integer getTheory() { return theory; }
        public void setTheory(Integer theory) { this.theory = theory; }

        public Integer getAssessment() { return assessment; }
        public void setAssessment(Integer assessment) { this.assessment = assessment; }
    }

    // Constructors
    public LearningDNA() {}

    // Getters and Setters
    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getLearningStyle() { return learningStyle; }
    public void setLearningStyle(String learningStyle) { this.learningStyle = learningStyle; }

    public String getWeeklyCommitment() { return weeklyCommitment; }
    public void setWeeklyCommitment(String weeklyCommitment) { this.weeklyCommitment = weeklyCommitment; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getGrowthAreas() { return growthAreas; }
    public void setGrowthAreas(List<String> growthAreas) { this.growthAreas = growthAreas; }

    public String getLearningVelocity() { return learningVelocity; }
    public void setLearningVelocity(String learningVelocity) { this.learningVelocity = learningVelocity; }

    public LearningMix getRecommendedStyle() { return recommendedStyle; }
    public void setRecommendedStyle(LearningMix recommendedStyle) { this.recommendedStyle = recommendedStyle; }
}
