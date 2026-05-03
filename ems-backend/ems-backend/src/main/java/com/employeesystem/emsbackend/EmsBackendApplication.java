package com.employeesystem.emsbackend;

import com.employeesystem.emsbackend.entity.User;
import com.employeesystem.emsbackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EmsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmsBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner createAdmin(UserRepository userRepository,
                                  PasswordEncoder passwordEncoder) {

		return args -> {

			String adminUsername = "admin";

			userRepository.findByUsername(adminUsername)
					.ifPresentOrElse(
							user -> System.out.println("Admin already exists"),
							() -> {
								User admin = new User();
								admin.setUsername(adminUsername);
								admin.setPassword(passwordEncoder.encode("admin123"));
								admin.setRole("ADMIN");

								userRepository.save(admin);

								System.out.println("✅ Default admin created");
							}
					);
		};
	}
}