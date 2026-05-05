package com.bom.entity;

import com.bom.entity.enums.RetailerStatus;
import com.bom.entity.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id
    private String id;
    private String businessName;
    private String ownerName;
    private String email;
    private String phone;
    private String gstTaxId;
    private String address;
    private String password;
    private Role role;
    private RetailerStatus retailerStatus;
}
