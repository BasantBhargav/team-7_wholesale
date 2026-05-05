package com.bom.service;

import com.bom.entity.User;
import com.bom.entity.enums.RetailerStatus;
import com.bom.entity.enums.Role;
import com.bom.exception.BadRequestException;
import com.bom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> pendingRetailers() {
        return userRepository.findByRoleAndRetailerStatus(Role.RETAILER, RetailerStatus.PENDING);
    }

    public User setRetailerStatus(String userId, RetailerStatus status) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("Retailer not found"));
        user.setRetailerStatus(status);
        return userRepository.save(user);
    }
}
