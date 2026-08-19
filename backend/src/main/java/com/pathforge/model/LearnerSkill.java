package com.pathforge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "learner_skills")
public class LearnerSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    private Integer level;

    private Boolean isStrength;

    // Constructors
    public LearnerSkill() {}

    public LearnerSkill(Skill skill, Integer level) {
        this.skill = skill;
        this.level = level;
        this.isStrength = level >= 70;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { 
        this.level = level;
        this.isStrength = level >= 70;
    }

    public Boolean getIsStrength() { return isStrength; }
    public void setIsStrength(Boolean isStrength) { this.isStrength = isStrength; }
}
