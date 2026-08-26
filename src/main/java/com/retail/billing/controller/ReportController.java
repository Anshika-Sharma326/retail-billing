package com.retail.billing.controller;

import com.retail.billing.dto.ReportResponse;
import com.retail.billing.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ==========================
    // REPORTS
    // ADMIN + STAFF
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ReportResponse getReport(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return reportService.getReport(start, end);
    }
}