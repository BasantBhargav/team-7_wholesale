package com.bom.service;

import com.bom.dto.CartItemRequest;
import com.bom.entity.Cart;
import com.bom.entity.OrderItem;
import com.bom.entity.Product;
import com.bom.exception.BadRequestException;
import com.bom.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final PricingService pricingService;

    public CartService(CartRepository cartRepository, PricingService pricingService) {
        this.cartRepository = cartRepository;
        this.pricingService = pricingService;
    }

    public Cart getOrCreate(String retailerId) {
        return cartRepository.findByRetailerId(retailerId)
                .orElseGet(() -> cartRepository.save(Cart.builder().retailerId(retailerId).items(new ArrayList<>()).build()));
    }

    public Cart addItem(String retailerId, CartItemRequest request) {
        Cart cart = getOrCreate(retailerId);
        Product p = pricingService.validateAndGetBySku(request.getSku(), request.getQuantity());
        double unitPrice = pricingService.calculateUnitPrice(p, request.getQuantity());

        OrderItem existing = cart.getItems().stream().filter(i -> i.getSku().equals(request.getSku())).findFirst().orElse(null);
        if (existing != null) {
            int newQty = existing.getQuantity() + request.getQuantity();
            if (newQty < p.getMoq()) throw new BadRequestException("MOQ violation for " + p.getSku());
            existing.setQuantity(newQty);
            existing.setUnitPrice(pricingService.calculateUnitPrice(p, newQty));
            existing.setLineTotal(existing.getUnitPrice() * newQty);
        } else {
            cart.getItems().add(OrderItem.builder()
                    .productId(p.getId())
                    .sku(p.getSku())
                    .productName(p.getName())
                    .quantity(request.getQuantity())
                    .unitPrice(unitPrice)
                    .lineTotal(unitPrice * request.getQuantity())
                    .build());
        }
        return cartRepository.save(cart);
    }

    public Cart updateItem(String retailerId, CartItemRequest request) {
        Cart cart = getOrCreate(retailerId);
        Product p = pricingService.validateAndGetBySku(request.getSku(), request.getQuantity());
        OrderItem existing = cart.getItems().stream().filter(i -> i.getSku().equals(request.getSku())).findFirst()
                .orElseThrow(() -> new BadRequestException("Item not in cart"));

        double unitPrice = pricingService.calculateUnitPrice(p, request.getQuantity());
        existing.setQuantity(request.getQuantity());
        existing.setUnitPrice(unitPrice);
        existing.setLineTotal(unitPrice * request.getQuantity());
        return cartRepository.save(cart);
    }

    public Cart removeItem(String retailerId, String sku) {
        Cart cart = getOrCreate(retailerId);
        cart.setItems(cart.getItems().stream().filter(i -> !i.getSku().equals(sku)).toList());
        return cartRepository.save(cart);
    }

    public void clear(String retailerId) {
        Cart cart = getOrCreate(retailerId);
        cart.setItems(new ArrayList<>());
        cartRepository.save(cart);
    }

    public Cart bulkAdd(String retailerId, List<CartItemRequest> rows) {
        Cart cart = getOrCreate(retailerId);
        for (CartItemRequest row : rows) {
            addItem(retailerId, row);
        }
        return cartRepository.findByRetailerId(retailerId).orElse(cart);
    }
}
