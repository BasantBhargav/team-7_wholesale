package com.bom.repository;

import com.bom.entity.CreditAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CreditAccountRepository extends MongoRepository<CreditAccount, String> {
    Optional<CreditAccount> findByRetailerId(String retailerId);
}
