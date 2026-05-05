// Created by Bom on 2024/6/17.   //resolves the error of "The field email is not annotated with @NotBlank or @NotNull, but it is required for login. Please annotate it accordingly."
package com.bom.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    private String email;

    @NotBlank
    private String password;
}
