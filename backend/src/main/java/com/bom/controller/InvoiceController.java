package com.bom.controller;

import com.bom.service.InvoiceService;
import com.bom.util.ApiResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/generate/{orderId}")
    public ApiResponse<?> generate(@PathVariable String orderId) {
        return ApiResponse.builder().success(true).message("Invoice generated").data(invoiceService.generate(orderId)).build();
    }

    @GetMapping("/me")
    public ApiResponse<?> mine(Authentication authentication) {
        return ApiResponse.builder().success(true).data(invoiceService.listForRetailer(authentication.getName())).build();
    }

    @GetMapping("/download/{invoiceNumber}")
    public ResponseEntity<Resource> download(@PathVariable String invoiceNumber) {
        System.out.println("Invoice API called successfully");
        Resource resource = invoiceService.download(invoiceNumber);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + invoiceNumber + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
    
}
