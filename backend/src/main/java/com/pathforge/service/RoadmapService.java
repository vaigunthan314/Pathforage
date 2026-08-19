package com.pathforge.service;

import com.pathforge.dto.RoadmapDTO;
import com.pathforge.dto.SkillGap;
import com.pathforge.model.*;
import com.pathforge.repository.RoadmapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RoadmapService {

    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private LearnerService learnerService;

    @Autowired
    private SkillGapService skillGapService;

    /**
     * Per-learner locks: concurrent generate/recalculate for the same user must
     * never race "no active roadmap" and double-insert, or the later read
     * throws NonUniqueResult. Serialize the check-then-insert on a per-learner
     * monitor; the map is lazily populated and bounded in practice by distinct
     * learners, and each entry is tiny.
     */
    private final Map<Long, Object> learnerLocks = new ConcurrentHashMap<>();

    private Object lockFor(Long learnerId) {
        return learnerLocks.computeIfAbsent(learnerId, k -> new Object());
    }

    @Transactional
    public Roadmap generateRoadmap(Long learnerId) {
        synchronized (lockFor(learnerId)) {
            return generateRoadmapLocked(learnerId);
        }
    }

    /**
     * The whole check-then-insert plus save must stay inside the transaction,
     * otherwise a waiting TX can still miss the uncommitted insert. The
     * pessimistic write lock on the learner row makes the second TX block
     * until the first commits, and the re-check then finds the roadmap.
     */
    private Roadmap generateRoadmapLocked(Long learnerId) {
        Learner learner = learnerService.getLearnerForUpdate(learnerId);

        // Double-check inside the lock: a concurrent generate may have
        // already created the active roadmap while we waited.
        Optional<Roadmap> existingRoadmap = roadmapRepository
            .findByLearnerIdAndIsActiveOrderByIdDesc(learner.getId(), true)
            .stream().findFirst();

        if (existingRoadmap.isPresent()) {
            return existingRoadmap.get();
        }

        // Create new roadmap based on goal
        Roadmap roadmap = new Roadmap();
        roadmap.setLearner(learner);
        roadmap.setTitle(learner.getGoal());
        roadmap.setDuration(learner.getTargetTimeline());
        roadmap.setCompletionPercentage(0);

        // Generate phases based on goal
        List<RoadmapPhase> phases = generatePhases(learner);
        roadmap.setPhases(phases);

        return roadmapRepository.save(roadmap);
    }

    @Transactional
    public Roadmap generateRoadmap(Learner learner) {
        synchronized (lockFor(learner.getId())) {
            return generateRoadmapLocked(learner.getId());
        }
    }

    private List<RoadmapPhase> generatePhases(Learner learner) {
        List<RoadmapPhase> phases = new ArrayList<>();
        String goal = learner.getGoal();

        if (goal == null) goal = "General";

        switch (goal.toLowerCase()) {
            case "cloud engineer":
            case "devops engineer":
                phases = generateCloudDevOpsPhases(learner);
                break;
            case "full stack developer":
                phases = generateFullStackPhases(learner);
                break;
            case "ai/ml engineer":
                phases = generateAIMLPhases(learner);
                break;
            default:
                phases = generateDefaultPhases(learner);
        }

        return phases;
    }

    private List<RoadmapPhase> generateCloudDevOpsPhases(Learner learner) {
        List<RoadmapPhase> phases = new ArrayList<>();
        
        // Phase 1: Foundation
        RoadmapPhase foundation = new RoadmapPhase("FOUNDATION", "Build core technical fundamentals", 1);
        foundation.setColor("from-green-500 to-emerald-500");
        List<RoadmapItem> foundationItems = new ArrayList<>();
        
        foundationItems.add(createItem("Linux Fundamentals", "Master the Linux command line", "2 weeks", 
            isSkillMastered(learner, "Linux") ? "completed" : "in-progress", 1));
        foundationItems.add(createItem("Git & Version Control", "Learn version control essentials", "1 week", 
            isSkillMastered(learner, "Git") ? "completed" : "locked", 2));
        foundationItems.add(createItem("Networking Basics", "Understand networking fundamentals", "3 weeks", 
            "locked", 3));
        
        foundation.setItems(foundationItems);
        phases.add(foundation);

        // Phase 2: Cloud
        RoadmapPhase cloud = new RoadmapPhase("CLOUD", "Master AWS cloud services", 2);
        cloud.setColor("from-primary-500 to-cyan-500");
        List<RoadmapItem> cloudItems = new ArrayList<>();
        
        cloudItems.add(createItem("AWS Fundamentals", "Learn AWS core services", "2 weeks", "locked", 1));
        cloudItems.add(createItem("EC2 & Compute", "Master virtual servers", "2 weeks", "locked", 2));
        cloudItems.add(createItem("S3 & Storage", "Learn object storage", "1 week", "locked", 3));
        cloudItems.add(createItem("IAM & Security", "Understand access management", "1 week", "locked", 4));
        cloudItems.add(createItem("VPC & Networking", "Master virtual networking", "2 weeks", "locked", 5));
        
        cloud.setItems(cloudItems);
        phases.add(cloud);

        // Phase 3: Containers
        RoadmapPhase containers = new RoadmapPhase("CONTAINERS", "Learn containerization with Docker", 3);
        containers.setColor("from-cyan-500 to-primary-500");
        List<RoadmapItem> containerItems = new ArrayList<>();
        
        containerItems.add(createItem("Docker Fundamentals", "Learn container basics", "2 weeks", "locked", 1));
        containerItems.add(createItem("Docker Compose", "Multi-container applications", "1 week", "locked", 2));
        
        containers.setItems(containerItems);
        phases.add(containers);

        // Phase 4: DevOps
        RoadmapPhase devops = new RoadmapPhase("DEVOPS", "Implement CI/CD pipelines", 4);
        devops.setColor("from-violet-500 to-primary-500");
        List<RoadmapItem> devopsItems = new ArrayList<>();
        
        devopsItems.add(createItem("CI/CD Concepts", "Understand automation basics", "1 week", "locked", 1));
        devopsItems.add(createItem("GitHub Actions", "Build deployment pipelines", "2 weeks", "locked", 2));
        
        devops.setItems(devopsItems);
        phases.add(devops);

        // Phase 5: Orchestration
        RoadmapPhase orchestration = new RoadmapPhase("ORCHESTRATION", "Deploy with Kubernetes", 5);
        orchestration.setColor("from-primary-500 to-violet-500");
        List<RoadmapItem> orchestrationItems = new ArrayList<>();
        
        orchestrationItems.add(createItem("Kubernetes Basics", "Learn container orchestration", "3 weeks", "locked", 1));
        
        orchestration.setItems(orchestrationItems);
        phases.add(orchestration);

        // Phase 6: Capstone
        RoadmapPhase capstone = new RoadmapPhase("CAPSTONE", "Build a production application", 6);
        capstone.setColor("from-cyan-500 to-violet-500");
        List<RoadmapItem> capstoneItems = new ArrayList<>();
        
        capstoneItems.add(createItem("Deploy Production App", "Apply all skills in real project", "2 weeks", "locked", 1));
        
        capstone.setItems(capstoneItems);
        phases.add(capstone);

        return phases;
    }

    private List<RoadmapPhase> generateFullStackPhases(Learner learner) {
        List<RoadmapPhase> phases = new ArrayList<>();
        
        // Phase 1: Frontend Foundations
        RoadmapPhase frontend = new RoadmapPhase("FRONTEND", "Build user interfaces", 1);
        frontend.setColor("from-cyan-500 to-primary-500");
        List<RoadmapItem> frontendItems = new ArrayList<>();
        
        frontendItems.add(createItem("HTML & CSS", "Master markup and styling", "2 weeks", 
            isSkillMastered(learner, "HTML") ? "completed" : "in-progress", 1));
        frontendItems.add(createItem("JavaScript", "Learn programming fundamentals", "3 weeks", "locked", 2));
        frontendItems.add(createItem("React", "Build modern UIs", "3 weeks", "locked", 3));
        
        frontend.setItems(frontendItems);
        phases.add(frontend);

        // Phase 2: Backend
        RoadmapPhase backend = new RoadmapPhase("BACKEND", "Build server-side applications", 2);
        backend.setColor("from-primary-500 to-violet-500");
        List<RoadmapItem> backendItems = new ArrayList<>();
        
        backendItems.add(createItem("Node.js", "Learn server-side JavaScript", "2 weeks", "locked", 1));
        backendItems.add(createItem("REST APIs", "Build web services", "2 weeks", "locked", 2));
        backendItems.add(createItem("SQL", "Master database operations", "2 weeks", "locked", 3));
        
        backend.setItems(backendItems);
        phases.add(backend);

        // Phase 3: Full Stack
        RoadmapPhase fullstack = new RoadmapPhase("FULL STACK", "Integrate frontend and backend", 3);
        fullstack.setColor("from-violet-500 to-cyan-500");
        List<RoadmapItem> fullstackItems = new ArrayList<>();
        
        fullstackItems.add(createItem("Authentication", "Implement user auth", "1 week", "locked", 1));
        fullstackItems.add(createItem("Deployment", "Deploy your application", "2 weeks", "locked", 2));
        
        fullstack.setItems(fullstackItems);
        phases.add(fullstack);

        return phases;
    }

    private List<RoadmapPhase> generateAIMLPhases(Learner learner) {
        List<RoadmapPhase> phases = new ArrayList<>();
        
        // Phase 1: Python Foundations
        RoadmapPhase python = new RoadmapPhase("PYTHON", "Master Python programming", 1);
        python.setColor("from-green-500 to-emerald-500");
        List<RoadmapItem> pythonItems = new ArrayList<>();
        
        pythonItems.add(createItem("Python Basics", "Learn Python fundamentals", "2 weeks", 
            isSkillMastered(learner, "Python") ? "completed" : "in-progress", 1));
        pythonItems.add(createItem("Data Structures", "Master algorithms", "3 weeks", "locked", 2));
        
        python.setItems(pythonItems);
        phases.add(python);

        // Phase 2: Machine Learning
        RoadmapPhase ml = new RoadmapPhase("MACHINE LEARNING", "Learn ML algorithms", 2);
        ml.setColor("from-primary-500 to-cyan-500");
        List<RoadmapItem> mlItems = new ArrayList<>();
        
        mlItems.add(createItem("ML Fundamentals", "Understand core concepts", "3 weeks", "locked", 1));
        mlItems.add(createItem("Scikit-learn", "Implement ML models", "2 weeks", "locked", 2));
        
        ml.setItems(mlItems);
        phases.add(ml);

        return phases;
    }

    private List<RoadmapPhase> generateDefaultPhases(Learner learner) {
        List<RoadmapPhase> phases = new ArrayList<>();
        
        RoadmapPhase phase1 = new RoadmapPhase("FOUNDATIONS", "Build core skills", 1);
        phase1.setColor("from-primary-500 to-cyan-500");
        List<RoadmapItem> items = new ArrayList<>();
        
        items.add(createItem("Fundamentals", "Learn the basics", "3 weeks", "in-progress", 1));
        items.add(createItem("Intermediate", "Build on foundations", "3 weeks", "locked", 2));
        
        phase1.setItems(items);
        phases.add(phase1);

        return phases;
    }

    private RoadmapItem createItem(String name, String description, String duration, String status, Integer order) {
        RoadmapItem item = new RoadmapItem();
        item.setName(name);
        item.setDescription(description);
        item.setDuration(duration);
        item.setStatus(status);
        item.setItemOrder(order);
        item.setType("learning");
        item.setWhyItMatters("Essential for your " + "career" + " journey");
        return item;
    }

    private boolean isSkillMastered(Learner learner, String skillName) {
        if (learner.getCurrentSkills() == null) return false;
        
        return learner.getCurrentSkills().stream()
            .anyMatch(ls -> ls.getSkill().getName().equalsIgnoreCase(skillName) && ls.getLevel() >= 70);
    }

    public Roadmap getActiveRoadmap(Long learnerId) {
        return roadmapRepository.findByLearnerIdAndIsActiveOrderByIdDesc(learnerId, true)
            .stream().findFirst().orElse(null);
    }

    public RoadmapDTO convertToDTO(Roadmap roadmap) {
        RoadmapDTO dto = new RoadmapDTO();
        dto.setId(roadmap.getId());
        dto.setTitle(roadmap.getTitle());
        dto.setDuration(roadmap.getDuration());
        dto.setCompletionPercentage(roadmap.getCompletionPercentage());

        List<RoadmapDTO.PhaseDTO> phaseDTOs = new ArrayList<>();
        if (roadmap.getPhases() != null) {
            for (RoadmapPhase phase : roadmap.getPhases()) {
                RoadmapDTO.PhaseDTO phaseDTO = new RoadmapDTO.PhaseDTO();
                phaseDTO.setId(phase.getId());
                phaseDTO.setName(phase.getName());
                phaseDTO.setDescription(phase.getDescription());
                phaseDTO.setPhaseOrder(phase.getPhaseOrder());

                List<RoadmapDTO.ItemDTO> itemDTOs = new ArrayList<>();
                if (phase.getItems() != null) {
                    for (RoadmapItem item : phase.getItems()) {
                        RoadmapDTO.ItemDTO itemDTO = new RoadmapDTO.ItemDTO();
                        itemDTO.setId(item.getId());
                        itemDTO.setName(item.getName());
                        itemDTO.setWhyItMatters(item.getWhyItMatters());
                        itemDTO.setDuration(item.getDuration());
                        itemDTO.setStatus(item.getStatus());
                        itemDTO.setType(item.getType());
                        itemDTO.setSkillLevel("Beginner");
                        itemDTO.setPrerequisites(List.of());
                        itemDTO.setResources(List.of());
                        itemDTOs.add(itemDTO);
                    }
                }
                phaseDTO.setItems(itemDTOs);
                phaseDTOs.add(phaseDTO);
            }
        }
        dto.setPhases(phaseDTOs);

        return dto;
    }

    @Transactional
    public Roadmap recalculateRoadmap(Long learnerId) {
        synchronized (lockFor(learnerId)) {
            Learner learner = learnerService.getLearnerForUpdate(learnerId);
            Roadmap roadmap = getActiveRoadmap(learnerId);
        
        if (roadmap == null) {
            return generateRoadmap(learner);
        }

        // Check skill gaps and adjust roadmap
        List<SkillGap> gaps = skillGapService.analyzeSkillGaps(learner);
        
        // Find critical gaps that need immediate attention
        boolean needsAdjustment = gaps.stream()
            .anyMatch(gap -> gap.getPriority().equals("critical") && gap.getGap() > 30);

        if (needsAdjustment) {
            // Regenerate roadmap with updated priorities. generateRoadmap
            // re-acquires the same per-learner lock (reentrant) and
            // double-checks inside the transaction.
            roadmap.setIsActive(false);
            roadmapRepository.save(roadmap);
            
            return generateRoadmap(learner.getId());
        }

        return roadmap;
        }
    }
}
