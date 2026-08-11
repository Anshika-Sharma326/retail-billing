package com.retail.billing.service.impl;

import com.retail.billing.entity.AppUser;
import com.retail.billing.enums.Role;
import com.retail.billing.enums.Status;
import com.retail.billing.repository.UserRepository;
import com.retail.billing.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    // ==========================
    // Pending Staff Requests
    // ==========================

    @Override
    public List<AppUser> getPendingUsers() {

        return userRepository.findByStatus(Status.PENDING);

    }

    // ==========================
    // Approve Staff
    // ==========================

    @Override
    public void approveUser(Long id) {

        AppUser user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setStatus(Status.ACTIVE);

        userRepository.save(user);

    }

    // ==========================
    // Reject Staff
    // ==========================

    @Override
    public void rejectUser(Long id) {

        AppUser user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setStatus(Status.REJECTED);

        userRepository.save(user);

    }

    // ==========================
    // Get Active Employees
    // ==========================

    @Override
    public List<AppUser> getAllEmployees() {

        return userRepository.findByRoleAndStatus(
                Role.STAFF,
                Status.ACTIVE
        );
    }

    // ==========================
    // Disable Employee
    // ==========================

    @Override
    public void disableEmployee(Long id) {

        AppUser user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        user.setStatus(Status.DISABLED);

        userRepository.save(user);

    }

    // ==========================
    // Enable Employee
    // ==========================

    @Override
    public void enableEmployee(Long id) {

        AppUser user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        user.setStatus(Status.ACTIVE);

        userRepository.save(user);

    }

    // ==========================
    // Delete Employee
    // ==========================

    @Override
    public void deleteEmployee(Long id) {

        AppUser user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        userRepository.delete(user);

    }

}