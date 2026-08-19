package com.pathforge.service;

import com.pathforge.model.Learner;
import com.pathforge.model.Progress;
import com.pathforge.model.Assessment;
import com.pathforge.repository.ProgressRepository;
import com.pathforge.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private LearnerService learnerService;

    public Progress getProgress(Long learnerId) {
        Optional<Progress> existingProgress = progressRepository.findByLearnerId(learnerId);
        
        if (existingProgress.isPresent()) {
            return existingProgress.get();
        }
        
        // Create new progress record
        Learner learner = learnerService.getLearner(learnerId);
        Progress progress = new Progress(learner);
        return progressRepository.save(progress);
    }

    @Transactional
    public Progress updateProgress(Long learnerId, Progress updateData) {
        Progress progress = getProgress(learnerId);
        
        if (updateData.getOverallProgress() != null) {
            progress.setOverallProgress(updateData.getOverallProgress());
        }
        if (updateData.getHoursLearned() != null) {
            progress.setHoursLearned(updateData.getHoursLearned());
        }
        if (updateData.getSkillsMastered() != null) {
            progress.setSkillsMastered(updateData.getSkillsMastered());
        }
        if (updateData.getProjectsCompleted() != null) {
            progress.setProjectsCompleted(updateData.getProjectsCompleted());
        }
        
        progress.recordActivity();
        
        // Update assessment score based on latest assessment
        List<Assessment> assessments = assessmentRepository.findByLearnerId(learnerId);
        if (!assessments.isEmpty()) {
            int totalScore = assessments.stream()
                .filter(a -> a.getScore() != null)
                .mapToInt(Assessment::getScore)
                .sum();
            int count = (int) assessments.stream()
                .filter(a -> a.getScore() != null)
                .count();
            if (count > 0) {
                progress.setAssessmentScore(totalScore / count);
            }
        }
        
        // Calculate roadmap completion
        progress.setRoadmapCompletion(calculateRoadmapCompletion(progress));
        
        return progressRepository.save(progress);
    }

    private int calculateRoadmapCompletion(Progress progress) {
        // Simple calculation based on progress metrics
        int completion = 0;
        
        if (progress.getSkillsMastered() > 0) {
            completion += Math.min(progress.getSkillsMastered() * 10, 40);
        }
        if (progress.getProjectsCompleted() > 0) {
            completion += Math.min(progress.getProjectsCompleted() * 15, 30);
        }
        if (progress.getHoursLearned() > 0) {
            completion += Math.min(progress.getHoursLearned() / 10, 20);
        }
        if (progress.getAssessmentScore() > 0) {
            completion += Math.min(progress.getAssessmentScore() / 10, 10);
        }
        
        return Math.min(completion, 100);
    }

    @Transactional
    public Progress recordActivity(Long learnerId) {
        Progress progress = getProgress(learnerId);
        progress.recordActivity();
        return progressRepository.save(progress);
    }
}
