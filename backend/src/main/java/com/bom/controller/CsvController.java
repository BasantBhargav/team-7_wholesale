package com.bom.controller;

import com.bom.dto.CartItemRequest;
import com.bom.service.CartService;
import com.bom.service.CsvUploadService;
import com.bom.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
@RequiredArgsConstructor
@Slf4j
public class CsvController {

    private final CsvUploadService csvUploadService;
    private final CartService cartService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadCsv(
            Authentication authentication,
            @RequestPart("file") MultipartFile file
    ) {
        validateFile(file);

        log.info("CSV upload initiated by user: {}", authentication.getName());

        Map<String, Object> parsedResult = csvUploadService.parseAndValidate(file);

        List<CartItemRequest> cartItems = extractCartItems(parsedResult);

        if (!cartItems.isEmpty()) {
            cartService.bulkAdd(authentication.getName(), cartItems);
        }

        log.info("CSV upload processed successfully. Items added: {}", cartItems.size());

        return ApiResponse.builder()
                .success(true)
                .message("CSV processed successfully")
                .data(parsedResult)
                .build();
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || 
           (!contentType.equals("text/csv") && !contentType.equals("application/vnd.ms-excel"))) {
            throw new IllegalArgumentException("Only CSV files are allowed");
        }
    }

    @SuppressWarnings("unchecked")
    private List<CartItemRequest> extractCartItems(Map<String, Object> parsedResult) {

        Object validItemsObj = parsedResult.get("validItems");

        if (!(validItemsObj instanceof List<?> validItems)) {
            return List.of();
        }

        return validItems.stream()
                .filter(item -> item instanceof Map)
                .map(item -> (Map<String, Object>) item)
                .map(this::mapToCartItem)
                .toList();
    }

    private CartItemRequest mapToCartItem(Map<String, Object> item) {
        CartItemRequest request = new CartItemRequest();

        request.setSku((String) item.get("sku"));

        Object quantityObj = item.get("quantity");
        if (quantityObj instanceof Number number) {
            request.setQuantity(number.intValue());
        } else {
            throw new IllegalArgumentException("Invalid quantity format in CSV");
        }

        return request;
    }
}