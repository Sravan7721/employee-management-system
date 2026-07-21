package com.sravan.employeemanagement.repository;

import com.sravan.employeemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ==========================
    // Find By Username
    // ==========================

    Optional<User> findByUsername(
            String username
    );

    // ==========================
    // Dashboard
    // ==========================

    long countByRole(
            String role
    );

}