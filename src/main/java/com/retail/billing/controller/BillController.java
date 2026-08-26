package com.retail.billing.controller;

import com.retail.billing.dto.BillRequest;
import com.retail.billing.entity.Bill;
import com.retail.billing.service.BillService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // ==========================
    // CREATE BILL
    // ADMIN + STAFF
    // ==========================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public Bill createBill(@Valid @RequestBody BillRequest request) {
        return billService.createBill(request);
    }

    // ==========================
    // GET ALL BILLS
    // ADMIN + STAFF
    // ==========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    // ==========================
    // GET BILL BY ID
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public Bill getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }

    // ==========================
    // RECENT BILLS
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/recent")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Bill> getRecentBills() {
        return billService.getRecentBills();
    }

    // ==========================
    // CUSTOMER BILL HISTORY
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/customer/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Bill> getBillsByCustomer(@PathVariable String name) {
        return billService.getBillsByCustomer(name);
    }

    // ==========================
    // DATE WISE BILLS
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/between")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Bill> getBillsBetweenDates(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return billService.getBillsBetweenDates(start, end);
    }

    // ==========================
    // DELETE BILL
    // ADMIN ONLY
    // ==========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteBill(@PathVariable Long id) {
        return billService.deleteBill(id);
    }

    // ==========================
    // TOTAL SALES
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/sales/total")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public Double getTotalSales() {
        return billService.getTotalSales();
    }

    // ==========================
    // TODAY SALES
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/sales/today")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public Double getTodaySales(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return billService.getTodaySales(start, end);
    }

    // ==========================
    // TOP SELLING PRODUCTS
    // ADMIN + STAFF
    // ==========================
    @GetMapping("/top-products")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public List<Object[]> getTopSellingProducts() {
        return billService.getTopSellingProducts();
    }
}