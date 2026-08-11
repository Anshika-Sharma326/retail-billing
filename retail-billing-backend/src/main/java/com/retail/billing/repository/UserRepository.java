package com.retail.billing.repository;

import com.retail.billing.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import com.retail.billing.enums.Status;
import com.retail.billing.enums.Role;
import java.util.Optional;
import java.util.List;
public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByUsername(String username);
    List<AppUser> findByStatus(Status status);
    List<AppUser> findByRoleAndStatus(Role role, Status status);
    List<AppUser> findByRole(Role role);
}