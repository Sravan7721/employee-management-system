package com.sravan.employeemanagement.repository;

import com.sravan.employeemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // ==========================
    // Search By Name
    // ==========================

    List<Employee> findByNameContainingIgnoreCase(
            String name
    );

    // ==========================
    // Search By Department
    // ==========================

    List<Employee> findByDepartmentContainingIgnoreCase(
            String department
    );

    // ==========================
    // Dashboard
    // ==========================

    @Query("""
            SELECT COUNT(DISTINCT e.department)
            FROM Employee e
            """)
    long countDepartments();

    // ==========================
    // Employees By Department
    // ==========================

    @Query("""
            SELECT e.department,
                   COUNT(e)
            FROM Employee e
            GROUP BY e.department
            ORDER BY e.department
            """)
    List<Object[]> getEmployeesByDepartment();

}