package com.pathforge.repository;

import com.pathforge.model.Learner;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {
    Optional<Learner> findByEmail(String email);
    Optional<Learner> findByAuthId(String authId);

    /**
     * Row-level pessimistic lock: used when creating learner-owned aggregates
     * (e.g. the single active roadmap), so concurrent requests for the same
     * learner serialize at the database instead of racing check-then-insert.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select l from Learner l where l.id = :id")
    Optional<Learner> findByIdForUpdate(@Param("id") Long id);
}
