package com.bom.dto;

import com.bom.entity.enums.PaymentMode;
import lombok.Data;

import java.util.Map;

@Data
public class CreateOrderRequest {
    private Map<String, Integer> skuQtyMap;
    private PaymentMode paymentMode;
}
