package com.retail.billing.controller;

import com.retail.billing.dto.DateWiseSalesResponse;
import com.retail.billing.dto.MonthlySalesResponse;
import com.retail.billing.dto.SalesReportResponse;
import com.retail.billing.dto.TopSellingProductResponse;
import com.retail.billing.service.SalesReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    // Overall Sales Report
    @GetMapping("/sales")
    public SalesReportResponse getSalesReport() {
        return salesReportService.getSalesReport();
    }

    // Date Wise Sales Report
    @GetMapping("/sales/date")
    public DateWiseSalesResponse getSalesReportByDate(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return salesReportService.getSalesReportByDate(start, end);
    }

    // Monthly Sales Report
    @GetMapping("/sales/monthly")
    public MonthlySalesResponse getMonthlySalesReport(
            @RequestParam int year,
            @RequestParam int month) {

        return salesReportService.getMonthlySalesReport(year, month);
    }

    // Top Selling Products Report
    @GetMapping("/top-products")
    public List<TopSellingProductResponse> getTopSellingProducts() {
        return salesReportService.getTopSellingProducts();
    }
}