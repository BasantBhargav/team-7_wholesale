package com.bom.entity;

import com.bom.entity.enums.RfqStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "rfqs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Rfq {
    @Id
    private String id;
    private String retailerId;
    private String productId;
    private int requestedQuantity;
    private double proposedPrice;
    private String notes;
    private RfqStatus status;
    private Double counterOfferPrice;
}
