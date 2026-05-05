package com.bom.dto;

import lombok.Data;

@Data
public class RfqRequestDto {
    private String productId;
    private int requestedQuantity;
    private double proposedPrice;
    private String notes;
}
