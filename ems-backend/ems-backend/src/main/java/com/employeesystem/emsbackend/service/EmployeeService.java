package com.employeesystem.emsbackend.service;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.exception.ResourceNotFoundException;
import com.employeesystem.emsbackend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // ================= CREATE =================
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // ================= GET BY ID =================
    public Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee Id " + employeeId + " not found"
                        )
                );
    }

    // ================= GET ALL (PAGINATION + SEARCH) =================
    public Page<Employee> getAllEmployee(int page, int size, String search) {

        Pageable pageable = PageRequest.of(page, size);

        // 🔥 SAFE CHECK (important for null + empty + spaces)
        if (search == null || search.trim().isEmpty()) {
            return employeeRepository.findAll(pageable);
        }

        return employeeRepository.searchEmployees(search, pageable);
    }

    // ================= UPDATE =================
    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Employee emp = findEmployeeById(id);

        emp.setFirstName(updatedEmployee.getFirstName());
        emp.setLastName(updatedEmployee.getLastName());
        emp.setEmail(updatedEmployee.getEmail());

        return employeeRepository.save(emp);
    }

    // ================= DELETE =================
    public void deleteEmployeeById(Long id) {

        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Employee not found Id " + id
            );
        }

        employeeRepository.deleteById(id);
    }

    // ================= GET BY EMAIL =================
    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}