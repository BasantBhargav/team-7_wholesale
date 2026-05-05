package com.bom.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "credit_accounts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreditAccount {
    @Id
    private String id;
    private String retailerId;
    private double totalLimit;
    private double usedCredit;
    private double dueAmount;
}
