package com.retail.billing.service;

import com.retail.billing.dto.DateWiseSalesResponse;
import com.retail.billing.dto.MonthlySalesResponse;
import com.retail.billing.dto.SalesReportResponse;
import com.retail.billing.dto.TopSellingProductResponse;
import com.retail.billing.entity.Bill;
import com.retail.billing.repository.BillItemRepository;
import com.retail.billing.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SalesReportService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillItemRepository billItemRepository;

    // Overall Sales Report
    public SalesReportResponse getSalesReport() {

        long totalBills = billRepository.count();

        Double totalSales = billRepository.getTotalSales();

        if (totalSales == null) {
            totalSales = 0.0;
        }

        double averageBillAmount =
                totalBills == 0 ? 0.0 : totalSales / totalBills;

        return new SalesReportResponse(
                totalBills,
                totalSales,
                averageBillAmount
        );
    }

    // Date Wise Sales Report
    public DateWiseSalesResponse getSalesReportByDate(
            LocalDateTime start,
            LocalDateTime end) {

        List<Bill> bills = billRepository.findByBillDateBetween(start, end);

        long totalBills = billRepository.countByBillDateBetween(start, end);

        Double totalSales = billRepository.getTotalSalesBetween(start, end);

        if (totalSales == null) {
            totalSales = 0.0;
        }

        return new DateWiseSalesResponse(
                start,
                end,
                totalBills,
                totalSales,
                bills
        );
    }

    // Monthly Sales Report
    public MonthlySalesResponse getMonthlySalesReport(int year, int month) {

        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);

        LocalDateTime end = start.plusMonths(1).minusSeconds(1);

        long totalBills = billRepository.countByBillDateBetween(start, end);

        Double totalSales = billRepository.getTotalSalesBetween(start, end);

        if (totalSales == null) {
            totalSales = 0.0;
        }

        return new MonthlySalesResponse(
                year,
                start.getMonth(),
                totalBills,
                totalSales
        );
    }

    // Top Selling Products Report
    public List<TopSellingProductResponse> getTopSellingProducts() {

        List<Object[]> results = billItemRepository.findTopSellingProducts();

        List<TopSellingProductResponse> response = new ArrayList<>();

        for (Object[] row : results) {

            response.add(
                    new TopSellingProductResponse(
                            (String) row[0],
                            ((Number) row[1]).longValue(),
                            ((Number) row[2]).doubleValue()
                    )
            );
        }

        return response;
    }
}