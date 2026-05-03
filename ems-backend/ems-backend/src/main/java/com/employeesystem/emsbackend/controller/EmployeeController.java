package com.employeesystem.emsbackend.controller;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/emp")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee emp = employeeService.addEmployee(employee);
        return new ResponseEntity<>(emp, HttpStatus.CREATED);
    }

    // ✅ GET BY ID
    @GetMapping(path = "/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable("id") Long id) {
        Employee emp = employeeService.findEmployeeById(id);
        return ResponseEntity.ok(emp);
    }

    // 🔥 UPDATED: PAGINATION + SEARCH SUPPORT
    @GetMapping
    public Page<Employee> getAllEmployee(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size,
            @RequestParam(required = false) String search
    ) {

        System.out.println("🔥 SEARCH VALUE = " + search);

        return employeeService.getAllEmployee(page, size, search);
    }

    // ✅ UPDATE
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable("id") Long id,
            @RequestBody Employee updateEmployee
    ) {
        Employee emp = employeeService.updateEmployee(id, updateEmployee);
        return ResponseEntity.ok(emp);
    }

    // ✅ DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }

    // ✅ EMAIL SEARCH (unchanged)
    @GetMapping("/email-id/{mail}")
    public ResponseEntity<Employee> findByEmployeeEmail(@PathVariable("mail") String email) {
        return ResponseEntity.ok(employeeService.findEmployeeByEmail(email));
    }
}