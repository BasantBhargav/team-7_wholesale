package com.bom.service;

import com.bom.entity.Invoice;
import com.bom.entity.Order;
import com.bom.exception.BadRequestException;
import com.bom.repository.InvoiceRepository;
import com.bom.repository.OrderRepository;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InvoiceService {

    private final OrderRepository orderRepository;
    private final InvoiceRepository invoiceRepository;

    public InvoiceService(OrderRepository orderRepository, InvoiceRepository invoiceRepository) {
        this.orderRepository = orderRepository;
        this.invoiceRepository = invoiceRepository;
    }

    public Invoice generate(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new BadRequestException("Order not found"));
        new File("generated-invoices").mkdirs();
        String invoiceNumber = "INV-" + System.currentTimeMillis();
        String path = "generated-invoices/" + invoiceNumber + ".pdf";

        try (PdfWriter writer = new PdfWriter(path);
             com.itextpdf.kernel.pdf.PdfDocument pdf = new com.itextpdf.kernel.pdf.PdfDocument(writer);
             Document doc = new Document(pdf)) {
            doc.add(new Paragraph("Bulk Order Management Invoice"));
            doc.add(new Paragraph("Invoice No: " + invoiceNumber));
            doc.add(new Paragraph("Order Id: " + order.getId()));
            doc.add(new Paragraph("SubTotal: " + order.getSubTotal()));
            doc.add(new Paragraph("GST: " + order.getGstAmount()));
            doc.add(new Paragraph("Grand Total: " + order.getGrandTotal()));
            doc.add(new Paragraph("Payment Terms: " + order.getPaymentMode()));
            order.getItems().forEach(i -> doc.add(new Paragraph(i.getSku() + " | " + i.getQuantity() + " | " + i.getUnitPrice() + " | " + i.getLineTotal())));
        } catch (Exception e) {
            throw new BadRequestException("Failed PDF generation: " + e.getMessage());
        }

        Invoice invoice = Invoice.builder()
                .orderId(orderId)
                .invoiceNumber(invoiceNumber)
                .totalAmount(order.getGrandTotal())
                .dueAmount(order.getPaymentMode().name().contains("CREDIT") ? order.getGrandTotal() : 0)
                .pdfPath(path)
                .generatedAt(LocalDateTime.now())
                .build();
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> listForRetailer(String retailerId) {
        Set<String> orderIds = orderRepository.findByRetailerId(retailerId).stream().map(Order::getId).collect(Collectors.toSet());
        return invoiceRepository.findAll().stream().filter(i -> orderIds.contains(i.getOrderId())).toList();
    }

    public Resource download(String invoiceNumber) {
        Invoice invoice = invoiceRepository.findByInvoiceNumber(invoiceNumber).orElseThrow(() -> new BadRequestException("Invoice not found"));
        return new FileSystemResource(invoice.getPdfPath());
    }
}
