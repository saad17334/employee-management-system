package com.employeesystem.emsbackend.securityConfig;

import com.employeesystem.emsbackend.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService myUserDetailsService;

    // 🔥 ADD THIS (missing in your code)
    @Autowired
    private JwtFilter jwtFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors()
                .and()
                .csrf().disable()

                .authorizeRequests()

                // ✅ Public APIs
                .antMatchers("/auth/**").permitAll()

                .antMatchers("/admin/**").hasRole("ADMIN")

                // ✅ ADMIN only
                .antMatchers(HttpMethod.DELETE, "/api/emp/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/emp/**").hasRole("ADMIN")

                // ✅ VIEW → ADMIN + EMPLOYEE
                .antMatchers(HttpMethod.GET, "/api/emp/**")
                .hasAnyRole("ADMIN", "EMPLOYEE")

                // ✅ CREATE (choose rule)
                .antMatchers(HttpMethod.POST, "/api/emp/**")
                .hasRole("ADMIN")

                // ✅ All other
                .anyRequest().authenticated()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}