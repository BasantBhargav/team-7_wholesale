package com.bom.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CartItemRequest {
    @NotBlank
    private String sku;

    @Min(1)
    private int quantity;
}
