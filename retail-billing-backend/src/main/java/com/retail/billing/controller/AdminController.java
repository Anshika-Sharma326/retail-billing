package com.retail.billing.controller;

import com.retail.billing.entity.AppUser;
import com.retail.billing.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppUser> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    @PutMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String approveUser(@PathVariable Long id) {

        adminService.approveUser(id);

        return "Employee Approved Successfully";
    }

    @PutMapping("/reject/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String rejectUser(@PathVariable Long id) {

        adminService.rejectUser(id);

        return "Employee Rejected Successfully";
    }
    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppUser> getAllEmployees() {
        return adminService.getAllEmployees();
    }
    @PutMapping("/disable/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> disableEmployee(@PathVariable Long id) {

        try {

            adminService.disableEmployee(id);

            return ResponseEntity.ok("Employee Disabled Successfully");

        } catch (Exception e) {

            e.printStackTrace();   // <-- ye important hai

            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @PutMapping("/enable/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> enableEmployee(@PathVariable Long id) {

        try {

            adminService.enableEmployee(id);

            return ResponseEntity.ok("Employee Enabled Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {

        try {

            adminService.deleteEmployee(id);

            return ResponseEntity.ok("Employee Deleted Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}