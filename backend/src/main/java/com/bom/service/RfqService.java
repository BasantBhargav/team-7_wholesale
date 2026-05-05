package com.bom.service;

import com.bom.dto.RfqRequestDto;
import com.bom.entity.Rfq;
import com.bom.entity.enums.RfqStatus;
import com.bom.exception.BadRequestException;
import com.bom.repository.RfqRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RfqService {
    private final RfqRepository rfqRepository;

    public RfqService(RfqRepository rfqRepository) {
        this.rfqRepository = rfqRepository;
    }

    public Rfq create(String retailerId, RfqRequestDto dto) {
        Rfq rfq = Rfq.builder()
                .retailerId(retailerId)
                .productId(dto.getProductId())
                .requestedQuantity(dto.getRequestedQuantity())
                .proposedPrice(dto.getProposedPrice())
                .notes(dto.getNotes())
                .status(RfqStatus.PENDING)
                .build();
        return rfqRepository.save(rfq);
    }

    public List<Rfq> allForRetailer(String retailerId) {
        return rfqRepository.findByRetailerId(retailerId);
    }

    public Rfq respond(String rfqId, String action, Double counterOffer) {
        Rfq rfq = rfqRepository.findById(rfqId).orElseThrow(() -> new BadRequestException("RFQ not found"));
        switch (action.toUpperCase()) {
            case "APPROVE" -> rfq.setStatus(RfqStatus.APPROVED);
            case "REJECT" -> rfq.setStatus(RfqStatus.REJECTED);
            case "COUNTER" -> {
                rfq.setStatus(RfqStatus.COUNTERED);
                rfq.setCounterOfferPrice(counterOffer);
            }
            default -> throw new BadRequestException("Unsupported action");
        }
        return rfqRepository.save(rfq);
    }
}
