package com.sravan.employeemanagement.service;

import com.sravan.employeemanagement.dto.DashboardDTO;
import com.sravan.employeemanagement.dto.EmployeeDTO;
import com.sravan.employeemanagement.entity.Employee;
import com.sravan.employeemanagement.exception.EmployeeNotFoundException;
import com.sravan.employeemanagement.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private static final Logger log =
            LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    // ==========================================
    // Entity -> DTO
    // ==========================================

    private EmployeeDTO convertToDTO(Employee employee) {

        EmployeeDTO dto = new EmployeeDTO();

        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setDepartment(employee.getDepartment());
        dto.setSalary(employee.getSalary());
        dto.setPhoto(employee.getPhoto());

        if (employee.getPhoto() != null &&
                !employee.getPhoto().isEmpty()) {

            dto.setPhotoUrl(
                    "http://localhost:8080/files/download/"
                            + employee.getPhoto()
            );
        }

        return dto;
    }

    // ==========================================
    // DTO -> Entity
    // ==========================================

    private Employee convertToEntity(EmployeeDTO dto) {

        Employee employee = new Employee();

        employee.setId(dto.getId());
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());
        employee.setPhoto(dto.getPhoto());

        return employee;
    }

    // ==========================================
    // Create Employee
    // ==========================================

    public EmployeeDTO saveEmployee(EmployeeDTO dto) {

        log.info("Creating employee: {}", dto.getName());

        Employee employee = convertToEntity(dto);

        employee.setId(null);

        Employee savedEmployee =
                employeeRepository.save(employee);

        log.info("Employee created successfully.");

        return convertToDTO(savedEmployee);

    }

    // ==========================================
    // Get All Employees
    // ==========================================

    public List<EmployeeDTO> getAllEmployees() {

        return employeeRepository.findAll()

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }

    // ==========================================
    // Get Employee By ID
    // ==========================================

    public EmployeeDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)

                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found : " + id));

        return convertToDTO(employee);

    }

    // ==========================================
    // Update Employee
    // ==========================================

    public EmployeeDTO updateEmployee(
            Long id,
            EmployeeDTO dto
    ) {

        Employee employee =
                employeeRepository.findById(id)

                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found : " + id));

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());
        employee.setPhoto(dto.getPhoto());

        Employee updatedEmployee =
                employeeRepository.save(employee);

        return convertToDTO(updatedEmployee);

    }

    // ==========================================
    // Delete Employee
    // ==========================================

    public void deleteEmployee(Long id) {

        Employee employee =
                employeeRepository.findById(id)

                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found : " + id));

        employeeRepository.delete(employee);

    }

    // ==========================================
    // Pagination
    // ==========================================

    public Page<EmployeeDTO> getEmployees(

            int page,

            int size,

            String sortBy,

            String sortDir

    ) {

        Sort sort =
                sortDir.equalsIgnoreCase("asc")

                        ?

                        Sort.by(sortBy).ascending()

                        :

                        Sort.by(sortBy).descending();

        Pageable pageable =
                PageRequest.of(page, size, sort);

        return employeeRepository

                .findAll(pageable)

                .map(this::convertToDTO);

    }

    // ==========================================
    // Search By Name
    // ==========================================

    public List<EmployeeDTO> searchEmployeeByName(
            String name
    ) {

        return employeeRepository

                .findByNameContainingIgnoreCase(name)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }

    // ==========================================
    // Search By Department
    // ==========================================

    public List<EmployeeDTO> searchEmployeeByDepartment(
            String department
    ) {

        return employeeRepository

                .findByDepartmentContainingIgnoreCase(department)

                .stream()

                .map(this::convertToDTO)

                .collect(Collectors.toList());

    }

    // ==========================================
    // Dashboard Statistics
    // ==========================================



}