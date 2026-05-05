package com.bom.service;

import com.bom.dto.CreateOrderRequest;
import com.bom.entity.*;
import com.bom.entity.enums.OrderStatus;
import com.bom.entity.enums.PaymentMode;
import com.bom.exception.BadRequestException;
import com.bom.repository.CreditAccountRepository;
import com.bom.repository.OrderRepository;
import com.bom.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final PricingService pricingService;
    private final OrderRepository orderRepository;
    private final CreditAccountRepository creditAccountRepository;
    private final ProductRepository productRepository;

    public OrderService(PricingService pricingService, OrderRepository orderRepository, CreditAccountRepository creditAccountRepository, ProductRepository productRepository) {
        this.pricingService = pricingService;
        this.orderRepository = orderRepository;
        this.creditAccountRepository = creditAccountRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(String retailerId, CreateOrderRequest request) {
        List<OrderItem> items = new ArrayList<>();
        double subTotal = 0;

        for (Map.Entry<String, Integer> entry : request.getSkuQtyMap().entrySet()) {
            String sku = entry.getKey();
            int qty = entry.getValue();
            Product p = pricingService.validateAndGetBySku(sku, qty);
            double unitPrice = pricingService.calculateUnitPrice(p, qty);
            double lineTotal = unitPrice * qty;
            subTotal += lineTotal;
            items.add(OrderItem.builder()
                    .productId(p.getId())
                    .sku(p.getSku())
                    .productName(p.getName())
                    .quantity(qty)
                    .unitPrice(unitPrice)
                    .lineTotal(lineTotal)
                    .build());
            p.setStockQuantity(p.getStockQuantity() - qty);
            productRepository.save(p);
        }

        double gst = subTotal * 0.18;
        double grandTotal = subTotal + gst;

        if (request.getPaymentMode() == PaymentMode.CREDIT_NET_30) {
            CreditAccount account = creditAccountRepository.findByRetailerId(retailerId)
                    .orElseThrow(() -> new BadRequestException("Credit account not configured"));
            if (account.getUsedCredit() + grandTotal > account.getTotalLimit()) {
                throw new BadRequestException("Credit limit exceeded");
            }
            account.setUsedCredit(account.getUsedCredit() + grandTotal);
            account.setDueAmount(account.getDueAmount() + grandTotal);
            creditAccountRepository.save(account);
        }

        Order order = Order.builder()
                .retailerId(retailerId)
                .items(items)
                .subTotal(subTotal)
                .gstAmount(gst)
                .grandTotal(grandTotal)
                .paymentMode(request.getPaymentMode())
                .status(OrderStatus.PENDING_APPROVAL)
                .createdAt(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }

    public List<Order> getOrders(String retailerId) {
        return orderRepository.findByRetailerId(retailerId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateStatus(String orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new BadRequestException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public Order quickReorder(String retailerId, String previousOrderId) {
        Order prev = orderRepository.findByIdAndRetailerId(previousOrderId, retailerId)
                .orElseThrow(() -> new BadRequestException("Order not found"));
        CreateOrderRequest request = new CreateOrderRequest();
        request.setPaymentMode(prev.getPaymentMode());
        request.setSkuQtyMap(prev.getItems().stream().collect(Collectors.toMap(OrderItem::getSku, OrderItem::getQuantity)));
        return createOrder(retailerId, request);
    }
}
