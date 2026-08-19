package com.pathforge.dto;

public class SkillGap {

    private String skill;

    private Integer current;

    private Integer required;

    private String priority;

    private Integer gap;

    // Constructors
    public SkillGap() {}

    public SkillGap(String skill, Integer current, Integer required) {
        this.skill = skill;
        this.current = current;
        this.required = required;
        this.gap = required - current;
        this.priority = calculatePriority();
    }

    private String calculatePriority() {
        double percentage = (double) current / required;
        if (percentage < 0.3) return "critical";
        if (percentage < 0.6) return "high";
        if (percentage < 0.8) return "medium";
        return "low";
    }

    // Getters and Setters
    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public Integer getCurrent() { return current; }
    public void setCurrent(Integer current) { this.current = current; }

    public Integer getRequired() { return required; }
    public void setRequired(Integer required) { this.required = required; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Integer getGap() { return gap; }
    public void setGap(Integer gap) { this.gap = gap; }
}
