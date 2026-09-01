package com.retail.billing.repository;
import com.retail.billing.enums.CustomerStatus;
import java.util.*;
import com.retail.billing.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerRepository
        extends JpaRepository<Customer, Long> {


    boolean existsByMobile(String mobile);
    List<Customer> findByStatus(CustomerStatus status);
}