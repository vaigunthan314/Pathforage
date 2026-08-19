package com.pathforge.dto;

public class SkillDTO {

    private Long id;

    private String name;

    private String category;

    private Integer level;

    private Boolean isStrength;

    // Constructors
    public SkillDTO() {}

    public SkillDTO(String name, Integer level) {
        this.name = name;
        this.level = level;
        this.isStrength = level >= 70;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { 
        this.level = level;
        this.isStrength = level >= 70;
    }

    public Boolean getIsStrength() { return isStrength; }
    public void setIsStrength(Boolean isStrength) { this.isStrength = isStrength; }
}
