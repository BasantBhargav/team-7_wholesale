package com.bom.entity;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem {
    private String productId;
    private String sku;
    private String productName;
    private int quantity;
    private double unitPrice;
    private double lineTotal;
}
