package com.bom.repository;

import com.bom.entity.Order;
import com.bom.entity.enums.OrderStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByRetailerId(String retailerId);
    Optional<Order> findByIdAndRetailerId(String id, String retailerId);
    long countByStatus(OrderStatus status);
}
