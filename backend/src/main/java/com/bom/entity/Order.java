package com.bom.entity;

import com.bom.entity.enums.OrderStatus;
import com.bom.entity.enums.PaymentMode;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {
    @Id
    private String id;
    private String retailerId;
    private List<OrderItem> items;
    private double subTotal;
    private double gstAmount;
    private double grandTotal;
    private PaymentMode paymentMode;
    private OrderStatus status;
    private LocalDateTime createdAt;
}
