package com.sravan.employeemanagement.repository;

import com.sravan.employeemanagement.entity.Employee;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @DisplayName("Save Employee")
    void saveEmployeeTest() {

        Employee employee = new Employee();

        employee.setName("Sravan");
        employee.setEmail("sravan@gmail.com");
        employee.setDepartment("Software");
        employee.setSalary(70000);

        Employee savedEmployee = employeeRepository.save(employee);

        assertNotNull(savedEmployee);
        assertNotNull(savedEmployee.getId());

        assertEquals("Sravan", savedEmployee.getName());
        assertEquals("Software", savedEmployee.getDepartment());
    }

    @Test
    @DisplayName("Find Employee By Id")
    void findEmployeeByIdTest() {

        Employee employee = new Employee();

        employee.setName("Rahul");
        employee.setEmail("rahul@gmail.com");
        employee.setDepartment("HR");
        employee.setSalary(45000);

        Employee savedEmployee = employeeRepository.save(employee);

        Optional<Employee> result =
                employeeRepository.findById(savedEmployee.getId());

        assertTrue(result.isPresent());
        assertEquals("Rahul", result.get().getName());
    }

    @Test
    @DisplayName("Search Employee By Name")
    void searchEmployeeByNameTest() {

        Employee employee = new Employee();

        employee.setName("Anil Kumar");
        employee.setEmail("anil@gmail.com");
        employee.setDepartment("Finance");
        employee.setSalary(55000);

        employeeRepository.save(employee);

        List<Employee> employees =
                employeeRepository.findByNameContainingIgnoreCase("Anil");

        assertFalse(employees.isEmpty());

        assertEquals("Anil Kumar", employees.get(0).getName());
    }

    @Test
    @DisplayName("Search Employee By Department")
    void searchEmployeeByDepartmentTest() {

        Employee employee = new Employee();

        employee.setName("Priya");
        employee.setEmail("priya@gmail.com");
        employee.setDepartment("Testing");
        employee.setSalary(60000);

        employeeRepository.save(employee);

        List<Employee> employees =
                employeeRepository.findByDepartmentContainingIgnoreCase("Testing");

        assertFalse(employees.isEmpty());

        assertEquals("Testing", employees.get(0).getDepartment());
    }

    @Test
    @DisplayName("Delete Employee")
    void deleteEmployeeTest() {

        Employee employee = new Employee();

        employee.setName("Delete User");
        employee.setEmail("delete@gmail.com");
        employee.setDepartment("Admin");
        employee.setSalary(50000);

        Employee savedEmployee =
                employeeRepository.save(employee);

        employeeRepository.delete(savedEmployee);

        Optional<Employee> result =
                employeeRepository.findById(savedEmployee.getId());

        assertTrue(result.isEmpty());
    }
}