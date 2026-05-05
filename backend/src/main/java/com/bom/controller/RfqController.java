package com.bom.controller;

import com.bom.dto.RfqRequestDto;
import com.bom.service.RfqService;
import com.bom.util.ApiResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rfqs")
public class RfqController {
    private final RfqService rfqService;

    public RfqController(RfqService rfqService) {
        this.rfqService = rfqService;
    }

    @PostMapping
    public ApiResponse<?> create(Authentication authentication, @RequestBody RfqRequestDto dto) {
        return ApiResponse.builder().success(true).message("RFQ created").data(rfqService.create(authentication.getName(), dto)).build();
    }

    @GetMapping("/me")
    public ApiResponse<?> mine(Authentication authentication) {
        return ApiResponse.builder().success(true).data(rfqService.allForRetailer(authentication.getName())).build();
    }

    @PatchMapping("/{id}/respond")
    public ApiResponse<?> respond(@PathVariable String id, @RequestParam String action, @RequestParam(required = false) Double counterOffer) {
        return ApiResponse.builder().success(true).message("RFQ updated").data(rfqService.respond(id, action, counterOffer)).build();
    }
}
