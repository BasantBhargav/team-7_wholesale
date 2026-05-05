package com.bom.service;

import com.bom.entity.Product;
import com.bom.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(Product product) { return productRepository.save(product); }
    public void delete(String id) { productRepository.deleteById(id); }
    public Product getById(String id) { return productRepository.findById(id).orElse(null); }
    public Page<Product> list(int page, int size) { return productRepository.findAll(PageRequest.of(page, size)); }
}
