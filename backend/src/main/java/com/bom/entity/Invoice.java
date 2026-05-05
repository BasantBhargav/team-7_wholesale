package com.bom.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "invoices")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Invoice {
    @Id
    private String id;
    private String orderId;
    private String invoiceNumber;
    private double totalAmount;
    private double dueAmount;
    private String pdfPath;
    private LocalDateTime generatedAt;
}
