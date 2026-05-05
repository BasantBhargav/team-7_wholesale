package com.bom.service;

import com.bom.entity.Product;
import com.bom.exception.BadRequestException;
import com.bom.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

@Service
public class CsvUploadService {

    private final ProductRepository productRepository;

    public CsvUploadService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Map<String, Object> parseAndValidate(MultipartFile file) {
        List<Map<String, Object>> validRows = new ArrayList<>();
        List<String> invalidSkus = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean first = true;
            while ((line = reader.readLine()) != null) {
                if (first) { first = false; continue; }
                String[] parts = line.split(",");
                if (parts.length < 2) continue;
                String sku = parts[0].trim();
                int qty = Integer.parseInt(parts[1].trim());
                Optional<Product> product = productRepository.findBySku(sku);
                if (product.isPresent()) {
                    validRows.add(Map.of("sku", sku, "quantity", qty, "productId", product.get().getId()));
                } else {
                    invalidSkus.add(sku);
                }
            }
        } catch (Exception e) {
            throw new BadRequestException("Invalid CSV: " + e.getMessage());
        }

        return Map.of("validItems", validRows, "invalidSkus", invalidSkus);
    }
}
