package com.bom.controller;

import com.bom.dto.CreateOrderRequest;
import com.bom.entity.enums.OrderStatus;
import com.bom.service.OrderService;
import com.bom.util.ApiResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ApiResponse<?> create(Authentication authentication, @RequestBody CreateOrderRequest request) {
        return ApiResponse.builder().success(true).message("Order created").data(orderService.createOrder(authentication.getName(), request)).build();
    }

    @GetMapping
    public ApiResponse<?> list(Authentication authentication) {
        boolean admin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ApiResponse.builder().success(true).data(admin ? orderService.getAllOrders() : orderService.getOrders(authentication.getName())).build();
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<?> updateStatus(@PathVariable String id, @RequestParam OrderStatus status) {
        return ApiResponse.builder().success(true).message("Status updated").data(orderService.updateStatus(id, status)).build();
    }

    @PostMapping("/{id}/quick-reorder")
    public ApiResponse<?> quickReorder(Authentication authentication, @PathVariable String id) {
        return ApiResponse.builder().success(true).message("Reorder created").data(orderService.quickReorder(authentication.getName(), id)).build();
    }
}
