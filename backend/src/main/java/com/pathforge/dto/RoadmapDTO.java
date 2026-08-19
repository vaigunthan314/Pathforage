package com.pathforge.dto;

import java.util.List;

public class RoadmapDTO {

    private Long id;

    private String title;

    private String duration;

    private Integer completionPercentage;

    private List<PhaseDTO> phases;

    // Inner class for phase
    public static class PhaseDTO {
        private Long id;
        private String name;
        private String description;
        private Integer phaseOrder;
        private List<ItemDTO> items;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getPhaseOrder() { return phaseOrder; }
        public void setPhaseOrder(Integer phaseOrder) { this.phaseOrder = phaseOrder; }

        public List<ItemDTO> getItems() { return items; }
        public void setItems(List<ItemDTO> items) { this.items = items; }
    }

    // Inner class for item
    public static class ItemDTO {
        private Long id;
        private String name;
        private String whyItMatters;
        private String duration;
        private String status;
        private String type;
        private String skillLevel;
        private List<String> prerequisites;
        private List<String> resources;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getWhyItMatters() { return whyItMatters; }
        public void setWhyItMatters(String whyItMatters) { this.whyItMatters = whyItMatters; }

        public String getDuration() { return duration; }
        public void setDuration(String duration) { this.duration = duration; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public String getSkillLevel() { return skillLevel; }
        public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

        public List<String> getPrerequisites() { return prerequisites; }
        public void setPrerequisites(List<String> prerequisites) { this.prerequisites = prerequisites; }

        public List<String> getResources() { return resources; }
        public void setResources(List<String> resources) { this.resources = resources; }
    }

    // Constructors
    public RoadmapDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Integer getCompletionPercentage() { return completionPercentage; }
    public void setCompletionPercentage(Integer completionPercentage) { this.completionPercentage = completionPercentage; }

    public List<PhaseDTO> getPhases() { return phases; }
    public void setPhases(List<PhaseDTO> phases) { this.phases = phases; }
}
