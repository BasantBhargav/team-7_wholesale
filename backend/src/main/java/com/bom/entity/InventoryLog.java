package com.bom.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "inventory_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InventoryLog {
    @Id
    private String id;
    private String productId;
    private int delta;
    private String action;
    private LocalDateTime createdAt;
}
