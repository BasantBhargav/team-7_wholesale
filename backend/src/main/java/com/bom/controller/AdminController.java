package com.bom.controller;

import com.bom.entity.enums.RetailerStatus;
import com.bom.service.AdminService;
import com.bom.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/retailers/pending")
    public ApiResponse<?> pending() {
        return ApiResponse.builder().success(true).data(adminService.pendingRetailers()).build();
    }

    @PatchMapping("/retailers/{id}/status")
    public ApiResponse<?> status(@PathVariable String id, @RequestParam RetailerStatus status) {
        return ApiResponse.builder().success(true).message("Retailer status changed").data(adminService.setRetailerStatus(id, status)).build();
    }
}
