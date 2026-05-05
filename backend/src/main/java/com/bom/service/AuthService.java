package com.bom.service;

import com.bom.dto.AuthResponse;
import com.bom.dto.LoginRequest;
import com.bom.dto.RegisterRequest;
import com.bom.entity.User;
import com.bom.entity.enums.RetailerStatus;
import com.bom.entity.enums.Role;
import com.bom.exception.BadRequestException;
import com.bom.repository.UserRepository;
import com.bom.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String registerRetailer(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) throw new BadRequestException("Email already exists");
        User user = User.builder()
                .businessName(request.getBusinessName())
                .ownerName(request.getOwnerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .gstTaxId(request.getGstTaxId())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.RETAILER)
                .retailerStatus(RetailerStatus.PENDING)
                .build();
        userRepository.save(user);
        return "Registration submitted. Await admin approval.";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new BadRequestException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) throw new BadRequestException("Invalid credentials");
        if (user.getRole() == Role.RETAILER && user.getRetailerStatus() != RetailerStatus.APPROVED) {
            throw new BadRequestException("Retailer not approved yet");
        }
        String token = jwtService.generateToken(user.getId(), user.getRole().name());
        return AuthResponse.builder().accessToken(token).role(user.getRole().name()).userId(user.getId()).build();
    }
}
