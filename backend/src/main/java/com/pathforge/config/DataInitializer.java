package com.pathforge.config;

import com.pathforge.model.*;
import com.pathforge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CareerRoleRepository careerRoleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeSkills();
        initializeCourses();
        initializeProjects();
        initializeCareerRoles();
    }

    private void initializeSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                createSkill("Python", "Programming"),
                createSkill("Java", "Programming"),
                createSkill("JavaScript", "Programming"),
                createSkill("TypeScript", "Programming"),
                createSkill("HTML", "Web"),
                createSkill("CSS", "Web"),
                createSkill("React", "Web"),
                createSkill("Node.js", "Web"),
                createSkill("SQL", "Database"),
                createSkill("Git", "DevOps"),
                createSkill("Linux", "DevOps"),
                createSkill("Docker", "DevOps"),
                createSkill("Kubernetes", "DevOps"),
                createSkill("AWS", "Cloud"),
                createSkill("Azure", "Cloud"),
                createSkill("GCP", "Cloud"),
                createSkill("Networking", "Infrastructure"),
                createSkill("CI/CD", "DevOps"),
                createSkill("Terraform", "DevOps"),
                createSkill("Machine Learning", "AI")
            );
            skillRepository.saveAll(skills);
        }
    }

    private Skill createSkill(String name, String category) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        return skill;
    }

    private void initializeCourses() {
        if (courseRepository.count() == 0) {
            List<Course> courses = Arrays.asList(
                createCourse("Linux Fundamentals", "Master the Linux command line", "Linux Foundation", "Linux", "Beginner", "10 hours"),
                createCourse("AWS Cloud Practitioner", "Understand AWS cloud concepts", "AWS", "AWS", "Beginner", "20 hours"),
                createCourse("Docker for Beginners", "Learn containerization", "Docker", "Docker", "Beginner", "15 hours"),
                createCourse("Kubernetes Tutorial", "Container orchestration", "Kubernetes", "Kubernetes", "Intermediate", "25 hours"),
                createCourse("Networking Basics", "Essential networking concepts", "Cisco", "Networking", "Beginner", "12 hours"),
                createCourse("Python Basics", "Learn Python programming", "Python.org", "Python", "Beginner", "15 hours"),
                createCourse("Git & GitHub", "Version control mastery", "GitHub", "Git", "Beginner", "8 hours"),
                createCourse("React Crash Course", "Build modern UIs", "Traversy Media", "React", "Intermediate", "10 hours"),
                createCourse("Node.js Bootcamp", "Server-side JavaScript", "Udemy", "Node.js", "Intermediate", "20 hours"),
                createCourse("SQL Fundamentals", "Database operations", "Khan Academy", "SQL", "Beginner", "10 hours")
            );
            courseRepository.saveAll(courses);
        }
    }

    private Course createCourse(String title, String description, String provider, String skill, String level, String duration) {
        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setProvider(provider);
        course.setSkill(skill);
        course.setLevel(level);
        course.setDuration(duration);
        return course;
    }

    private void initializeProjects() {
        if (projectRepository.count() == 0) {
            List<Project> projects = Arrays.asList(
                createProject("Student Expense Tracker", "CLI expense tracking app", "Beginner", "1 week", "Python, SQLite", "Foundation"),
                createProject("Cloud Hosted Portfolio", "Deploy portfolio on AWS", "Intermediate", "2 weeks", "AWS S3, HTML, CSS", "Cloud"),
                createProject("Containerized Spring Boot App", "Dockerize a Java app", "Intermediate", "2 weeks", "Docker, Spring Boot", "Containers"),
                createProject("Automated Deployment Pipeline", "CI/CD with GitHub Actions", "Advanced", "3 weeks", "GitHub Actions, Docker", "DevOps"),
                createProject("Microservices on Kubernetes", "Deploy microservices", "Advanced", "3 weeks", "Kubernetes, Docker", "Orchestration")
            );
            projectRepository.saveAll(projects);
        }
    }

    private Project createProject(String name, String description, String difficulty, String duration, String techStack, String stage) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setDifficulty(difficulty);
        project.setDuration(duration);
        project.setTechStack(techStack);
        project.setStage(stage);
        project.setWhyRecommended("Apply your skills in a real-world scenario");
        project.setExpectedOutcome("Hands-on experience with " + techStack);
        return project;
    }

    private void initializeCareerRoles() {
        if (careerRoleRepository.count() == 0) {
            List<CareerRole> roles = Arrays.asList(
                createCareerRole("Cloud Engineer", "Design and manage cloud infrastructure", "$90,000 - $150,000", 
                    Arrays.asList("Linux", "Networking", "AWS", "Docker", "Kubernetes", "Python", "Git")),
                createCareerRole("DevOps Engineer", "Bridge development and operations", "$95,000 - $160,000", 
                    Arrays.asList("Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Git")),
                createCareerRole("Full Stack Developer", "Build end-to-end web applications", "$80,000 - $140,000", 
                    Arrays.asList("JavaScript", "React", "Node.js", "SQL", "HTML", "CSS", "Git")),
                createCareerRole("AI/ML Engineer", "Build machine learning models", "$100,000 - $180,000", 
                    Arrays.asList("Python", "Machine Learning", "SQL", "AWS", "Docker")),
                createCareerRole("Cybersecurity Analyst", "Protect systems from threats", "$75,000 - $130,000", 
                    Arrays.asList("Linux", "Networking", "Python", "SQL"))
            );
            careerRoleRepository.saveAll(roles);
        }
    }

    private CareerRole createCareerRole(String name, String description, String salaryRange, List<String> skills) {
        CareerRole role = new CareerRole();
        role.setName(name);
        role.setDescription(description);
        role.setSalaryRange(salaryRange);
        role.setRequiredSkills(skills);
        return role;
    }
}
