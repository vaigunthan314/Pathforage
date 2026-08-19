package com.pathforge.service;

import com.pathforge.model.*;
import com.pathforge.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private LearnerService learnerService;

    @Autowired
    private AIService aiService;

    @Transactional
    public Assessment generateAssessment(String topic, Long learnerId) {
        Learner learner = learnerService.getLearner(learnerId);
        
        Assessment assessment = new Assessment();
        assessment.setLearner(learner);
        assessment.setTopic(topic);
        
        // Generate questions (in real app, use AI)
        List<AssessmentQuestion> questions = generateQuestions(topic, learner);
        assessment.setQuestions(questions);
        assessment.setTotalQuestions(questions.size());
        
        return assessmentRepository.save(assessment);
    }

    private List<AssessmentQuestion> generateQuestions(String topic, Learner learner) {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        // Default questions based on topic
        switch (topic.toLowerCase()) {
            case "networking":
                questions = getNetworkingQuestions();
                break;
            case "linux":
                questions = getLinuxQuestions();
                break;
            case "aws":
                questions = getAWSQuestions();
                break;
            case "docker":
                questions = getDockerQuestions();
                break;
            default:
                questions = getDefaultQuestions();
        }
        
        return questions;
    }

    private List<AssessmentQuestion> getNetworkingQuestions() {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        questions.add(createMCQ(
            "What does TCP/IP stand for?",
            new String[]{"Transmission Control Protocol/Internet Protocol", "Transfer Control Program/Internet Protocol", "Transmission Computer Protocol/Internet Program", "Transfer Computer Program/Internal Protocol"},
            "0",
            1
        ));
        
        questions.add(createMCQ(
            "Which layer of the OSI model does IP operate at?",
            new String[]{"Transport Layer", "Network Layer", "Data Link Layer", "Application Layer"},
            "1",
            2
        ));
        
        questions.add(createMCQ(
            "What is the purpose of a subnet mask?",
            new String[]{"To encrypt network traffic", "To determine the network portion of an IP address", "To assign IP addresses automatically", "To route packets between networks"},
            "1",
            3
        ));
        
        questions.add(createTrueFalse(
            "DNS translates domain names to IP addresses.",
            "true",
            4
        ));
        
        questions.add(createMCQ(
            "Which protocol is used for secure web browsing?",
            new String[]{"HTTP", "FTP", "HTTPS", "SMTP"},
            "2",
            5
        ));
        
        return questions;
    }

    private List<AssessmentQuestion> getLinuxQuestions() {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        questions.add(createMCQ(
            "Which command is used to list files in Linux?",
            new String[]{"ls", "dir", "list", "show"},
            "0",
            1
        ));
        
        questions.add(createMCQ(
            "What does the 'chmod' command do?",
            new String[]{"Change directory", "Change file permissions", "Check memory", "Change hostname"},
            "1",
            2
        ));
        
        questions.add(createTrueFalse(
            "Linux is an open-source operating system.",
            "true",
            3
        ));
        
        questions.add(createMCQ(
            "Which command is used to copy files?",
            new String[]{"copy", "cp", "mv", "dup"},
            "1",
            4
        ));
        
        questions.add(createMCQ(
            "What is the root directory in Linux?",
            new String[]{"/home", "/root", "/", "/etc"},
            "2",
            5
        ));
        
        return questions;
    }

    private List<AssessmentQuestion> getAWSQuestions() {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        questions.add(createMCQ(
            "What does EC2 stand for in AWS?",
            new String[]{"Elastic Compute Cloud", "Elastic Container Cloud", "Enterprise Compute Core", "Elastic Cloud Computing"},
            "0",
            1
        ));
        
        questions.add(createMCQ(
            "Which AWS service is used for object storage?",
            new String[]{"EBS", "S3", "EFS", "Glacier"},
            "1",
            2
        ));
        
        questions.add(createTrueFalse(
            "IAM stands for Identity and Access Management.",
            "true",
            3
        ));
        
        questions.add(createMCQ(
            "What is a VPC in AWS?",
            new String[]{"Virtual Private Cloud", "Virtual Public Connection", "Very Private Channel", "Virtual Protocol Control"},
            "0",
            4
        ));
        
        questions.add(createMCQ(
            "Which AWS service is used for managed databases?",
            new String[]{"S3", "EC2", "RDS", "Lambda"},
            "2",
            5
        ));
        
        return questions;
    }

    private List<AssessmentQuestion> getDockerQuestions() {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        questions.add(createMCQ(
            "What is a Docker container?",
            new String[]{"A virtual machine", "A lightweight, standalone package", "A database", "An operating system"},
            "1",
            1
        ));
        
        questions.add(createMCQ(
            "What file is used to define a Docker image?",
            new String[]{"docker.txt", "Dockerfile", "image.config", "container.def"},
            "1",
            2
        ));
        
        questions.add(createTrueFalse(
            "Docker containers share the host OS kernel.",
            "true",
            3
        ));
        
        questions.add(createMCQ(
            "What command is used to build a Docker image?",
            new String[]{"docker build", "docker create", "docker make", "docker compile"},
            "0",
            4
        ));
        
        questions.add(createMCQ(
            "What is Docker Hub?",
            new String[]{"A container runtime", "A cloud registry for Docker images", "A monitoring tool", "A build system"},
            "1",
            5
        ));
        
        return questions;
    }

    private List<AssessmentQuestion> getDefaultQuestions() {
        List<AssessmentQuestion> questions = new ArrayList<>();
        
        questions.add(createMCQ(
            "What is the primary purpose of version control?",
            new String[]{"To run applications", "To track changes to code", "To design databases", "To manage servers"},
            "1",
            1
        ));
        
        questions.add(createTrueFalse(
            "Git is a distributed version control system.",
            "true",
            2
        ));
        
        questions.add(createMCQ(
            "Which command creates a new branch in Git?",
            new String[]{"git branch", "git new", "git create", "git checkout -b"},
            "0",
            3
        ));
        
        questions.add(createMCQ(
            "What does a commit represent in Git?",
            new String[]{"A file deletion", "A snapshot of changes", "A server connection", "A user login"},
            "1",
            4
        ));
        
        questions.add(createTrueFalse(
            "Pull requests are used in collaborative development.",
            "true",
            5
        ));
        
        return questions;
    }

    private AssessmentQuestion createMCQ(String questionText, String[] options, String correctAnswer, Integer order) {
        AssessmentQuestion question = new AssessmentQuestion();
        question.setQuestionText(questionText);
        question.setQuestionType("mcq");
        question.setOptions(String.join("|||", options));
        question.setCorrectAnswer(correctAnswer);
        question.setQuestionOrder(order);
        return question;
    }

    private AssessmentQuestion createTrueFalse(String questionText, String correctAnswer, Integer order) {
        AssessmentQuestion question = new AssessmentQuestion();
        question.setQuestionText(questionText);
        question.setQuestionType("true-false");
        question.setCorrectAnswer(correctAnswer);
        question.setQuestionOrder(order);
        return question;
    }

    @Transactional
    public Assessment submitAssessment(Long assessmentId, Map<String, String> answers) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
            .orElseThrow(() -> new RuntimeException("Assessment not found"));

        int correctCount = 0;
        
        for (AssessmentQuestion question : assessment.getQuestions()) {
            String userAnswer = answers.get(String.valueOf(question.getId()));
            question.evaluate(userAnswer);
            
            if (question.getIsCorrect()) {
                correctCount++;
            }
        }

        int score = (int) ((double) correctCount / assessment.getTotalQuestions() * 100);
        assessment.complete(correctCount, score);
        
        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getLearnerAssessments(Long learnerId) {
        return assessmentRepository.findByLearnerId(learnerId);
    }
}
