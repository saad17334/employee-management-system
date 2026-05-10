package com.employeesystem.emsbackend.controller;

import com.employeesystem.emsbackend.dto.AuthRequest;
import com.employeesystem.emsbackend.entity.User;
import com.employeesystem.emsbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody AuthRequest request) {

        // ✅ Check if user already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("User already exists");
        }

        User admin = new User();

        admin.setUsername(request.getUsername());

        admin.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        admin.setRole("ADMIN");

        userRepository.save(admin);

        return ResponseEntity.ok("Admin created successfully");
    }
}