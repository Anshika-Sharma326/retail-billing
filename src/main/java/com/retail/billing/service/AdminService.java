package com.retail.billing.service;

import com.retail.billing.entity.AppUser;
import java.util.List;

public interface AdminService {

    List<AppUser> getPendingUsers();

    void approveUser(Long id);

    void rejectUser(Long id);

    List<AppUser> getAllEmployees();

    void disableEmployee(Long id);

    void enableEmployee(Long id);

    void deleteEmployee(Long id);

}