package com.bom.controller;

import com.bom.dto.CartItemRequest;
import com.bom.service.CartService;
import com.bom.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ApiResponse<?> get(Authentication auth) {
        return ApiResponse.builder().success(true).data(cartService.getOrCreate(auth.getName())).build();
    }

    @PostMapping("/items")
    public ApiResponse<?> add(Authentication auth, @Valid @RequestBody CartItemRequest request) {
        return ApiResponse.builder().success(true).message("Added").data(cartService.addItem(auth.getName(), request)).build();
    }

    @PutMapping("/items")
    public ApiResponse<?> update(Authentication auth, @Valid @RequestBody CartItemRequest request) {
        return ApiResponse.builder().success(true).message("Updated").data(cartService.updateItem(auth.getName(), request)).build();
    }

    @DeleteMapping("/items/{sku}")
    public ApiResponse<?> remove(Authentication auth, @PathVariable String sku) {
        return ApiResponse.builder().success(true).message("Removed").data(cartService.removeItem(auth.getName(), sku)).build();
    }

    @DeleteMapping
    public ApiResponse<?> clear(Authentication auth) {
        cartService.clear(auth.getName());
        return ApiResponse.builder().success(true).message("Cleared").build();
    }
}
