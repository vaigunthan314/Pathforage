package com.pathforge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String provider;

    private String skill;

    private String level;

    private String duration;

    private String type; // video, course, tutorial, lab

    private String url;

    @Column(columnDefinition = "TEXT")
    private String tags;

    // Constructors
    public Course() {}

    public Course(String title, String description, String provider, String skill, String level, String duration) {
        this.title = title;
        this.description = description;
        this.provider = provider;
        this.skill = skill;
        this.level = level;
        this.duration = duration;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
