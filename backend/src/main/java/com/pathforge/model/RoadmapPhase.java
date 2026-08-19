package com.pathforge.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roadmap_phases")
public class RoadmapPhase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer phaseOrder;

    private String color;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "phase_id")
    @OrderBy("itemOrder ASC")
    private List<RoadmapItem> items = new ArrayList<>();

    // Constructors
    public RoadmapPhase() {}

    public RoadmapPhase(String name, String description, Integer phaseOrder) {
        this.name = name;
        this.description = description;
        this.phaseOrder = phaseOrder;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPhaseOrder() { return phaseOrder; }
    public void setPhaseOrder(Integer phaseOrder) { this.phaseOrder = phaseOrder; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public List<RoadmapItem> getItems() { return items; }
    public void setItems(List<RoadmapItem> items) { this.items = items; }
}
