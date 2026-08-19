package com.pathforge.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "career_roles")
public class CareerRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    private String salaryRange;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_role_skills", joinColumns = @JoinColumn(name = "career_role_id"))
    @Column(name = "skill_name")
    private List<String> requiredSkills = new ArrayList<>();

    // Constructors
    public CareerRole() {}

    public CareerRole(String name, String description, String salaryRange) {
        this.name = name;
        this.description = description;
        this.salaryRange = salaryRange;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }
}
