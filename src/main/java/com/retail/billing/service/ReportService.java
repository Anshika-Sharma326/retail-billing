package com.retail.billing.service;

import com.retail.billing.dto.ReportResponse;
import com.retail.billing.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReportService {

    @Autowired
    private BillRepository billRepository;

    public ReportResponse getReport(LocalDateTime start,
                                    LocalDateTime end) {

        long totalBills =
                billRepository.countByBillDateBetween(start, end);

        Double totalSales =
                billRepository.getTotalSalesBetween(start, end);

        if (totalSales == null) {
            totalSales = 0.0;
        }

        Double average =
                totalBills == 0 ? 0.0 : totalSales / totalBills;

        return new ReportResponse(
                totalBills,
                totalSales,
                average
        );
    }
}