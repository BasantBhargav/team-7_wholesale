package com.bom.controller;

import com.bom.dto.CartItemRequest;
import com.bom.service.CartService;
import com.bom.service.CsvUploadService;
import com.bom.util.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
public class CsvController {

    private final CsvUploadService csvUploadService;
    private final CartService cartService;

    public CsvController(CsvUploadService csvUploadService, CartService cartService) {
        this.csvUploadService = csvUploadService;
        this.cartService = cartService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> upload(Authentication auth, @RequestPart("file") MultipartFile file) {
        Map<String, Object> parsed = csvUploadService.parseAndValidate(file);
        List<Map<String, Object>> validItems = (List<Map<String, Object>>) parsed.getOrDefault("validItems", List.of());

        List<CartItemRequest> rows = new ArrayList<>();
        for (Map<String, Object> item : validItems) {
            CartItemRequest req = new CartItemRequest();
            req.setSku((String) item.get("sku"));
            req.setQuantity((Integer) item.get("quantity"));
            rows.add(req);
        }
        cartService.bulkAdd(auth.getName(), rows);
        return ApiResponse.builder().success(true).message("CSV parsed and cart updated").data(parsed).build();
    }
}
