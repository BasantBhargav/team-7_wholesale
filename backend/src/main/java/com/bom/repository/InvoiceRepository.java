package com.bom.repository;

import com.bom.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    List<Invoice> findByOrderId(String orderId);
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
}
