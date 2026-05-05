package com.bom.service;

import com.bom.entity.Product;
import com.bom.entity.TierPrice;
import com.bom.exception.BadRequestException;
import com.bom.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PricingService {

    private final ProductRepository productRepository;

    public PricingService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public double calculateUnitPrice(Product product, int qty) {
        List<TierPrice> tiers = product.getTierPricing();
        if (tiers != null) {
            for (TierPrice t : tiers) {
                boolean inRange = qty >= t.getMinQty() && (t.getMaxQty() == 0 || qty <= t.getMaxQty());
                if (inRange) return t.getUnitPrice();
            }
        }
        return product.getBasePrice();
    }

    public Product validateAndGetBySku(String sku, int qty) {
        Product product = productRepository.findBySku(sku).orElseThrow(() -> new BadRequestException("Invalid SKU: " + sku));
        if (qty < product.getMoq()) throw new BadRequestException("MOQ violation for " + sku);
        if (qty > product.getStockQuantity()) throw new BadRequestException("Insufficient stock for " + sku);
        return product;
    }
}
