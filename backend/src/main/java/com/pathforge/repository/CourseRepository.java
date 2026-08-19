package com.pathforge.repository;

import com.pathforge.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findBySkill(String skill);
    List<Course> findByLevel(String level);
    List<Course> findBySkillAndLevel(String skill, String level);
}
