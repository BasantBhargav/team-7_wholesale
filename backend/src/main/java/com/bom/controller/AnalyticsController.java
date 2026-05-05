package com.bom.controller;

import com.bom.entity.enums.OrderStatus;
import com.bom.repository.OrderRepository;
import com.bom.repository.ProductRepository;
import com.bom.repository.RfqRepository;
import com.bom.repository.UserRepository;
import com.bom.util.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RfqRepository rfqRepository;

    public AnalyticsController(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository, RfqRepository rfqRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.rfqRepository = rfqRepository;
    }

    @GetMapping("/admin")
    public ApiResponse<?> admin() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalOrders", orderRepository.count());
        data.put("pendingOrders", orderRepository.countByStatus(OrderStatus.PENDING_APPROVAL));
        data.put("totalProducts", productRepository.count());
        data.put("totalUsers", userRepository.count());
        data.put("totalRfqs", rfqRepository.count());
        return ApiResponse.builder().success(true).data(data).build();
    }
}
