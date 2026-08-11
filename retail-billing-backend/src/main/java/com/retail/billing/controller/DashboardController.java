package com.retail.billing.controller;


import com.retail.billing.dto.DashboardResponse;
import com.retail.billing.service.DashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {



    private final DashboardService dashboardService;



    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;

    }




    // ==========================
    // DASHBOARD DATA
    // ADMIN + STAFF
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<DashboardResponse> getDashboard() {


        return ResponseEntity.ok(
                dashboardService.getDashboardData()
        );

    }

}