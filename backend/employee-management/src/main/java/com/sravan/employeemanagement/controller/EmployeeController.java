package com.sravan.employeemanagement.controller;

import com.sravan.employeemanagement.dto.DashboardDTO;
import com.sravan.employeemanagement.dto.EmployeeDTO;
import com.sravan.employeemanagement.service.EmployeeService;
import com.sravan.employeemanagement.service.FileStorageService;
import com.sravan.employeemanagement.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private FileStorageService fileStorageService;

    // ==========================================
    // CREATE EMPLOYEE (WITHOUT PHOTO)
    // ==========================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeDTO>> saveEmployee(
            @Valid @RequestBody EmployeeDTO employeeDTO) {

        EmployeeDTO savedEmployee =
                employeeService.saveEmployee(employeeDTO);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee created successfully",
                        savedEmployee
                )
        );
    }

    // ==========================================
    // CREATE EMPLOYEE (WITH PHOTO)
    // ==========================================

    @PostMapping(
            value = "/with-photo",
            consumes = "multipart/form-data"
    )
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeDTO>> saveEmployeeWithPhoto(

            @RequestParam("name") String name,

            @RequestParam("email") String email,

            @RequestParam("department") String department,

            @RequestParam("salary") double salary,

            @RequestPart("photo") MultipartFile photo) {

        fileStorageService.uploadFile(photo);

        EmployeeDTO dto = new EmployeeDTO();

        dto.setName(name);
        dto.setEmail(email);
        dto.setDepartment(department);
        dto.setSalary(salary);
        dto.setPhoto(photo.getOriginalFilename());

        EmployeeDTO savedEmployee =
                employeeService.saveEmployee(dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee created successfully",
                        savedEmployee
                )
        );
    }

    // ==========================================
    // UPDATE EMPLOYEE
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployee(

            @PathVariable Long id,

            @Valid @RequestBody EmployeeDTO employeeDTO) {

        EmployeeDTO updatedEmployee =
                employeeService.updateEmployee(id, employeeDTO);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee updated successfully",
                        updatedEmployee
                )
        );
    }

    // ==========================================
    // UPDATE EMPLOYEE WITH PHOTO
    // ==========================================

    @PutMapping(
            value = "/with-photo/{id}",
            consumes = "multipart/form-data"
    )
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployeeWithPhoto(

            @PathVariable Long id,

            @RequestParam("name") String name,

            @RequestParam("email") String email,

            @RequestParam("department") String department,

            @RequestParam("salary") double salary,

            @RequestPart(value = "photo", required = false)
            MultipartFile photo) {

        EmployeeDTO employee =
                employeeService.getEmployeeById(id);

        employee.setName(name);
        employee.setEmail(email);
        employee.setDepartment(department);
        employee.setSalary(salary);

        if (photo != null && !photo.isEmpty()) {

            fileStorageService.uploadFile(photo);

            employee.setPhoto(photo.getOriginalFilename());

        }

        EmployeeDTO updatedEmployee =
                employeeService.updateEmployee(id, employee);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee updated successfully",
                        updatedEmployee
                )
        );
    }

    // ==========================================
    // DELETE EMPLOYEE
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee deleted successfully",
                        "Deleted"
                )
        );
    }

    // ==========================================
    // GET ALL EMPLOYEES
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> getAllEmployees() {

        List<EmployeeDTO> employees =
                employeeService.getAllEmployees();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    // ==========================================
    // GET EMPLOYEE BY ID
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getEmployeeById(
            @PathVariable Long id) {

        EmployeeDTO employee =
                employeeService.getEmployeeById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee fetched successfully",
                        employee
                )
        );
    }

    // ==========================================
    // SEARCH BY NAME
    // ==========================================

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> searchEmployeeByName(
            @RequestParam String name) {

        List<EmployeeDTO> employees =
                employeeService.searchEmployeeByName(name);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees found successfully",
                        employees
                )
        );
    }

    // ==========================================
    // SEARCH BY DEPARTMENT
    // ==========================================

    @GetMapping("/search/department")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> searchEmployeeByDepartment(
            @RequestParam String department) {

        List<EmployeeDTO> employees =
                employeeService.searchEmployeeByDepartment(department);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees found successfully",
                        employees
                )
        );
    }

    // ==========================================
    // PAGINATION + SORTING
    // ==========================================

    @GetMapping("/page")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<ApiResponse<Page<EmployeeDTO>>> getEmployees(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDir) {

        Page<EmployeeDTO> employees =
                employeeService.getEmployees(
                        page,
                        size,
                        sortBy,
                        sortDir
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================


}