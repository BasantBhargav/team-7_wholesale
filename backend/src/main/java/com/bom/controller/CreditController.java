package com.bom.controller;

import com.bom.dto.CreditAssignRequest;
import com.bom.service.CreditService;
import com.bom.util.ApiResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/credit")
public class CreditController {

    private final CreditService creditService;

    public CreditController(CreditService creditService) {
        this.creditService = creditService;
    }

    @PostMapping("/assign")
    public ApiResponse<?> assign(@RequestBody CreditAssignRequest request) {
        return ApiResponse.builder().success(true).message("Credit assigned").data(creditService.assign(request)).build();
    }

    @GetMapping("/me")
    public ApiResponse<?> myCredit(Authentication authentication) {
        return ApiResponse.builder().success(true).data(creditService.getByRetailer(authentication.getName())).build();
    }
}
