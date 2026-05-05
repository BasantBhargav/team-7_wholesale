package com.bom.dto;

import lombok.Data;

@Data
public class CreditAssignRequest {
    private String retailerId;
    private double totalLimit;
}
