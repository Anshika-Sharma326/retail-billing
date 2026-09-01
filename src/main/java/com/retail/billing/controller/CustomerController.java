package com.retail.billing.controller;

import com.retail.billing.entity.Customer;
import com.retail.billing.service.CustomerService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // ==========================
    // ADD CUSTOMER
    // ADMIN + STAFF
    // ==========================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<Customer> addCustomer(
            @Valid @RequestBody Customer customer) {

        return new ResponseEntity<>(
                customerService.addCustomer(customer),
                HttpStatus.CREATED
        );
    }

    // ==========================
    // GET ALL CUSTOMERS
    // ADMIN + STAFF
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<List<Customer>> getAllCustomers() {

        return ResponseEntity.ok(
                customerService.getAllCustomers()
        );
    }

    // ==========================
    // GET CUSTOMER BY ID
    // ADMIN + STAFF
    // ==========================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<Customer> getCustomerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                customerService.getCustomerById(id)
        );
    }

    // ==========================
    // UPDATE CUSTOMER
    // ADMIN + STAFF
    // ==========================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody Customer customer) {

        return ResponseEntity.ok(
                customerService.updateCustomer(id, customer)
        );
    }

    // ==========================
    // DELETE CUSTOMER
    // ADMIN ONLY
    // ==========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteCustomer(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                customerService.deleteCustomer(id)
        );
    }
}