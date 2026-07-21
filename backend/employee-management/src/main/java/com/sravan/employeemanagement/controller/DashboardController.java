package com.sravan.employeemanagement.controller;

import com.sravan.employeemanagement.dto.DashboardDTO;
import com.sravan.employeemanagement.service.DashboardService;
import com.sravan.employeemanagement.util.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class DashboardController {

    private static final Logger log =
            LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    private DashboardService dashboardService;

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<DashboardDTO>> getDashboard() {

        log.info("Fetching dashboard statistics.");

        DashboardDTO dashboard =
                dashboardService.getDashboardData();

        log.info("Dashboard statistics loaded successfully.");

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Dashboard loaded successfully",

                        dashboard

                )

        );

    }

    // ==========================================
    // Dashboard Chart
    // ==========================================

    @GetMapping("/dashboard/chart")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getChart() {

        log.info("Fetching dashboard chart.");

        List<Map<String, Object>> chart =
                dashboardService.getEmployeesByDepartment();

        log.info("Dashboard chart loaded successfully.");

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Dashboard chart loaded successfully",

                        chart

                )

        );

    }

}