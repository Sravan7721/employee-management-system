package com.sravan.employeemanagement.service;

import com.sravan.employeemanagement.dto.DashboardDTO;
import com.sravan.employeemanagement.repository.EmployeeRepository;
import com.sravan.employeemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    public DashboardDTO getDashboardData() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalEmployees(
                employeeRepository.count()
        );

        dashboard.setTotalDepartments(
                employeeRepository.countDepartments()
        );

        dashboard.setTotalAdmins(
                userRepository.countByRole("ADMIN")
        );

        dashboard.setTotalUsers(
                userRepository.countByRole("USER")
        );

        return dashboard;

    }

    // ==========================================
    // Employees By Department
    // ==========================================

    public List<Map<String, Object>> getEmployeesByDepartment() {

        List<Object[]> results =
                employeeRepository.getEmployeesByDepartment();

        List<Map<String, Object>> data =
                new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object> item =
                    new HashMap<>();

            item.put(
                    "name",
                    row[0]
            );

            item.put(
                    "value",
                    row[1]
            );

            data.add(item);

        }

        return data;

    }

}