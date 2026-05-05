package com.bom.entity;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TierPrice {
    private int minQty;
    private int maxQty;
    private double unitPrice;
}
