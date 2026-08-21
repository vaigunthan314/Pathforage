package com.pathforge.controller;

import com.pathforge.model.Course;
import com.pathforge.model.Skill;
import com.pathforge.repository.CourseRepository;
import com.pathforge.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DataController {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/courses/skill/{skill}")
    public ResponseEntity<List<Course>> getCoursesBySkill(@PathVariable String skill) {
        return ResponseEntity.ok(courseRepository.findBySkill(skill));
    }
}
