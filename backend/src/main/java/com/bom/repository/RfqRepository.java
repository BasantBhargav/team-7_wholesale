package com.bom.repository;

import com.bom.entity.Rfq;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RfqRepository extends MongoRepository<Rfq, String> {
    List<Rfq> findByRetailerId(String retailerId);
}
