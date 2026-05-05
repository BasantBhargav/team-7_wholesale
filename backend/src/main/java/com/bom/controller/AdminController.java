package com.bom.controller;

import com.bom.entity.enums.RetailerStatus;
import com.bom.service.AdminService;
import com.bom.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend requests
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * Fetch all pending retailers for admin approval
     */
    @GetMapping("/retailers/pending")
    public ApiResponse<?> getPendingRetailers() {
        return ApiResponse.builder()
                .success(true)
                .data(adminService.pendingRetailers())
                .build();
    }

    /**
     * Update retailer status (APPROVED / REJECTED)
     */
    @PatchMapping("/retailers/{id}/status")
    public ApiResponse<?> updateRetailerStatus(
            @PathVariable String id,
            @RequestParam RetailerStatus status) {

        return ApiResponse.builder()
                .success(true)
                .message("Retailer status changed")
                .data(adminService.setRetailerStatus(id, status))
                .build();
    }
}