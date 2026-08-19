package com.pathforge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assessment_questions")
public class AssessmentQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    private String questionType; // mcq, true-false, short-answer

    @Column(columnDefinition = "TEXT")
    private String options; // JSON array for MCQ

    private String correctAnswer;

    private Integer questionOrder;

    private Boolean isCorrect;

    private String userAnswer;

    // Constructors
    public AssessmentQuestion() {}

    public AssessmentQuestion(String questionText, String questionType, String correctAnswer, Integer questionOrder) {
        this.questionText = questionText;
        this.questionType = questionType;
        this.correctAnswer = correctAnswer;
        this.questionOrder = questionOrder;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getOptions() { return options; }
    public void setOptions(String options) { this.options = options; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public Integer getQuestionOrder() { return questionOrder; }
    public void setQuestionOrder(Integer questionOrder) { this.questionOrder = questionOrder; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

    public String getUserAnswer() { return userAnswer; }
    public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

    public void evaluate(String userAnswer) {
        this.userAnswer = userAnswer;
        this.isCorrect = correctAnswer.equalsIgnoreCase(userAnswer);
    }
}
