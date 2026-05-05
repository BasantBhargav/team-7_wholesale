package com.bom.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank private String businessName;
    @NotBlank private String ownerName;
    @Email private String email;
    @NotBlank private String phone;
    @NotBlank private String gstTaxId;
    @NotBlank private String address;
    @NotBlank private String password;
}
