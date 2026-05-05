package com.bom.service;

import com.bom.dto.CreditAssignRequest;
import com.bom.entity.CreditAccount;
import com.bom.repository.CreditAccountRepository;
import org.springframework.stereotype.Service;

@Service
public class CreditService {

    private final CreditAccountRepository creditAccountRepository;

    public CreditService(CreditAccountRepository creditAccountRepository) {
        this.creditAccountRepository = creditAccountRepository;
    }

    public CreditAccount assign(CreditAssignRequest request) {
        CreditAccount account = creditAccountRepository.findByRetailerId(request.getRetailerId())
                .orElse(CreditAccount.builder().retailerId(request.getRetailerId()).usedCredit(0).dueAmount(0).build());
        account.setTotalLimit(request.getTotalLimit());
        return creditAccountRepository.save(account);
    }

    public CreditAccount getByRetailer(String retailerId) {
        return creditAccountRepository.findByRetailerId(retailerId).orElse(null);
    }
}
