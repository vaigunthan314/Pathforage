package com.pathforge.repository;

import com.pathforge.model.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByLearnerId(Long learnerId);

    /**
     * Ordered list variant: tolerate (and deterministically resolve) any legacy
     * duplicate active roadmaps instead of throwing NonUniqueResultException.
     * The newest of the duplicates wins.
     */
    List<Roadmap> findByLearnerIdAndIsActiveOrderByIdDesc(Long learnerId, Boolean isActive);
}
