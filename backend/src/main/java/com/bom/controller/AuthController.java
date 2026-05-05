package com.bom.controller;

import com.bom.dto.LoginRequest;
import com.bom.dto.RegisterRequest;
import com.bom.service.AuthService;
import com.bom.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<?> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.builder().success(true).message(authService.registerRetailer(request)).build();
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.builder().success(true).message("Login successful").data(authService.login(request)).build();
    }
}
