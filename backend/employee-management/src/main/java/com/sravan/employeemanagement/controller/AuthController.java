package com.sravan.employeemanagement.controller;

import com.sravan.employeemanagement.dto.LoginRequest;
import com.sravan.employeemanagement.dto.LoginResponse;
import com.sravan.employeemanagement.entity.User;
import com.sravan.employeemanagement.service.JwtService;
import com.sravan.employeemanagement.service.UserService;
import com.sravan.employeemanagement.util.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log =
            LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    // ==========================
    // Register User
    // ==========================
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@RequestBody User user) {

        log.info("Registering new user: {}", user.getUsername());

        User savedUser = userService.registerUser(user);

        log.info("User registered successfully: {}", savedUser.getUsername());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User registered successfully",
                        savedUser
                )
        );
    }

    // ==========================
    // Login User
    // ==========================
    // ==========================
// Login User
// ==========================
    // ==========================
// Login User
// ==========================
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @RequestBody LoginRequest request) {

        log.info("Login request received for user: {}", request.getUsername());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );

        String token =
                jwtService.generateToken(userDetails);

        User user =
                userService.findByUsername(
                        request.getUsername()
                ).orElseThrow(() ->
                        new RuntimeException("User not found"));

        LoginResponse response =
                new LoginResponse(
                        token,
                        user.getRole()
                );

        log.info("JWT generated successfully for user: {}", request.getUsername());

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Login successful",

                        response

                )

        );

    }
}