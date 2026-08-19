package com.pathforge.service;

import com.pathforge.dto.LearnerDTO;
import com.pathforge.dto.SkillDTO;
import com.pathforge.model.Learner;
import com.pathforge.model.LearnerSkill;
import com.pathforge.model.Skill;
import com.pathforge.repository.LearnerRepository;
import com.pathforge.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LearnerService {

    @Autowired
    private LearnerRepository learnerRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Transactional
    public Learner createLearner(LearnerDTO dto) {
        Learner learner = new Learner();
        learner.setName(dto.getName());
        learner.setEmail(dto.getEmail());
        learner.setGoal(dto.getGoal());
        learner.setCurrentLevel(dto.getCurrentLevel());
        learner.setAvailableTime(dto.getAvailableTime());
        learner.setTargetTimeline(dto.getTargetTimeline());
        learner.setLearningStyle(dto.getLearningStyle());
        learner.setPriority(dto.getPriority());

        // Process skills
        if (dto.getCurrentSkills() != null) {
            List<LearnerSkill> learnerSkills = new ArrayList<>();
            for (SkillDTO skillDto : dto.getCurrentSkills()) {
                Skill skill = skillRepository.findByName(skillDto.getName())
                    .orElseGet(() -> {
                        Skill newSkill = new Skill(skillDto.getName(), "General");
                        return skillRepository.save(newSkill);
                    });
                
                LearnerSkill learnerSkill = new LearnerSkill(skill, skillDto.getLevel() != null ? skillDto.getLevel() : 50);
                learnerSkills.add(learnerSkill);
            }
            learner.setCurrentSkills(learnerSkills);
        }

        return learnerRepository.save(learner);
    }

    public Learner getLearner(Long id) {
        return learnerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Learner not found with id: " + id));
    }

    /**
     * Learner locked for writing (SELECT ... FOR UPDATE): callers building
     * learner-owned aggregates (active roadmap) rely on it to serialize
     * check-then-insert across transactions.
     */
    public Learner getLearnerForUpdate(Long id) {
        return learnerRepository.findByIdForUpdate(id)
            .orElseThrow(() -> new RuntimeException("Learner not found with id: " + id));
    }

    @Transactional
    public Learner getOrCreateByAuthId(String authId) {
        return learnerRepository.findByAuthId(authId).orElseGet(() -> {
            Learner learner = new Learner();
            learner.setAuthId(authId);
            learner.setName("Learner");
            return learnerRepository.save(learner);
        });
    }

    @Transactional
    public Learner updateProfileByAuthId(String authId, String name, String email, String profileData) {
        Learner learner = getOrCreateByAuthId(authId);
        if (name != null && !name.isBlank()) learner.setName(name);
        if (email != null) learner.setEmail(email);
        if (profileData != null) {
            learner.setProfileData(profileData);
            applyProfileData(learner, profileData);
        }
        return learnerRepository.save(learner);
    }

    // The frontend persists the full learner profile as JSON in profileData.
    // Mirror the meaningful fields into the structured columns so backend
    // engines (AI context, roadmap, learning DNA, skill gaps) see real data
    // instead of "not set".
    @SuppressWarnings("unchecked")
    private void applyProfileData(Learner learner, String profileData) {
        try {
            Map<String, Object> data = new com.fasterxml.jackson.databind.ObjectMapper()
                .readValue(profileData, java.util.LinkedHashMap.class);
            if (data.get("careerGoal") != null && !data.get("careerGoal").toString().isBlank()) {
                learner.setGoal(data.get("careerGoal").toString());
            }
            if (data.get("experienceLevel") != null && !data.get("experienceLevel").toString().isBlank()) {
                learner.setCurrentLevel(data.get("experienceLevel").toString());
            }
            String style = data.get("learningStyle") != null
                ? data.get("learningStyle").toString()
                : (data.get("learningPreference") != null ? data.get("learningPreference").toString() : null);
            if (style != null && !style.isBlank()) learner.setLearningStyle(style);
            if (data.get("priority") != null && !data.get("priority").toString().isBlank()) {
                learner.setPriority(data.get("priority").toString());
            }
            if (data.get("learningHours") != null && !data.get("learningHours").toString().isBlank()) {
                learner.setAvailableTime(data.get("learningHours").toString());
            }
            if (data.get("targetDuration") != null && !data.get("targetDuration").toString().isBlank()) {
                learner.setTargetTimeline(data.get("targetDuration").toString());
            }
        } catch (Exception ignored) {
            // profileData is optional auxiliary state; never fail a save on it.
        }
    }

    @Transactional
    public Learner updateLearner(Long id, LearnerDTO dto) {
        Learner learner = getLearner(id);
        if (dto.getName() != null) learner.setName(dto.getName());
        if (dto.getEmail() != null) learner.setEmail(dto.getEmail());
        if (dto.getGoal() != null) learner.setGoal(dto.getGoal());
        if (dto.getCurrentLevel() != null) learner.setCurrentLevel(dto.getCurrentLevel());
        if (dto.getAvailableTime() != null) learner.setAvailableTime(dto.getAvailableTime());
        if (dto.getTargetTimeline() != null) learner.setTargetTimeline(dto.getTargetTimeline());
        if (dto.getLearningStyle() != null) learner.setLearningStyle(dto.getLearningStyle());
        if (dto.getPriority() != null) learner.setPriority(dto.getPriority());
        // authId must never be replaced or dropped by an update
        if (dto.getAuthId() != null && learner.getAuthId() == null) learner.setAuthId(dto.getAuthId());
        return learnerRepository.save(learner);
    }

    public LearnerDTO convertToDTO(Learner learner) {
        LearnerDTO dto = new LearnerDTO();
        dto.setId(learner.getId());
        dto.setName(learner.getName());
        dto.setEmail(learner.getEmail());
        dto.setGoal(learner.getGoal());
        dto.setCurrentLevel(learner.getCurrentLevel());
        dto.setAvailableTime(learner.getAvailableTime());
        dto.setTargetTimeline(learner.getTargetTimeline());
        dto.setLearningStyle(learner.getLearningStyle());
        dto.setPriority(learner.getPriority());

        if (learner.getCurrentSkills() != null) {
            List<SkillDTO> skillDTOs = learner.getCurrentSkills().stream()
                .map(ls -> new SkillDTO(ls.getSkill().getName(), ls.getLevel()))
                .collect(Collectors.toList());
            dto.setCurrentSkills(skillDTOs);
        }

        return dto;
    }
}
