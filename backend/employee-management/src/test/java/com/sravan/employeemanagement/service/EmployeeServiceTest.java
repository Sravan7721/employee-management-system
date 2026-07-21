package com.sravan.employeemanagement.service;

import com.sravan.employeemanagement.dto.EmployeeDTO;
import com.sravan.employeemanagement.entity.Employee;
import com.sravan.employeemanagement.exception.EmployeeNotFoundException;
import com.sravan.employeemanagement.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    // ==========================
    // Test Save Employee
    // ==========================
    @Test
    void saveEmployee_ShouldReturnEmployeeDTO() {

        EmployeeDTO dto = new EmployeeDTO();
        dto.setName("Sravan");
        dto.setEmail("sravan@gmail.com");
        dto.setDepartment("Software");
        dto.setSalary(70000);

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setName("Sravan");
        employee.setEmail("sravan@gmail.com");
        employee.setDepartment("Software");
        employee.setSalary(70000);

        when(employeeRepository.save(any(Employee.class)))
                .thenReturn(employee);

        EmployeeDTO result = employeeService.saveEmployee(dto);

        assertNotNull(result);
        assertEquals("Sravan", result.getName());
        assertEquals("Software", result.getDepartment());

        verify(employeeRepository, times(1))
                .save(any(Employee.class));
    }

    // ==========================
    // Test Get Employee By ID
    // ==========================
    @Test
    void getEmployeeById_ShouldReturnEmployeeDTO() {

        Employee employee = new Employee();

        employee.setId(1L);
        employee.setName("Sravan");
        employee.setEmail("sravan@gmail.com");
        employee.setDepartment("Software");
        employee.setSalary(70000);

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee));

        EmployeeDTO result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Sravan", result.getName());
        assertEquals("Software", result.getDepartment());

        verify(employeeRepository, times(1))
                .findById(1L);
    }

    // ==========================
    // Test Employee Not Found
    // ==========================
    @Test
    void getEmployeeById_ShouldThrowException() {

        when(employeeRepository.findById(100L))
                .thenReturn(Optional.empty());

        EmployeeNotFoundException exception =
                assertThrows(
                        EmployeeNotFoundException.class,
                        () -> employeeService.getEmployeeById(100L)
                );

        assertEquals(
                "Employee not found with ID : 100",
                exception.getMessage()
        );

        verify(employeeRepository, times(1))
                .findById(100L);
    }
}