package com.bom.controller;

import com.bom.entity.Product;
import com.bom.service.ProductService;
import com.bom.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ApiResponse<?> create(@RequestBody Product product) {
        return ApiResponse.builder().success(true).message("Product saved").data(productService.save(product)).build();
    }

    @GetMapping
    public ApiResponse<?> list(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.builder().success(true).data(productService.list(page, size)).build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable String id, @RequestBody Product product) {
        product.setId(id);
        return ApiResponse.builder().success(true).message("Updated").data(productService.save(product)).build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable String id) {
        productService.delete(id);
        return ApiResponse.builder().success(true).message("Deleted").build();
    }
}
