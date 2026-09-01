package com.retail.billing.repository;


import com.retail.billing.entity.Bill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;



@Repository
public interface BillRepository
        extends JpaRepository<Bill, Long> {



    // ==========================
    // TOTAL SALES
    // ==========================

    @Query("""
            SELECT COALESCE(SUM(b.totalAmount),0)
            FROM Bill b
            """)
    Double getTotalSales();





    // ==========================
    // BILLS BETWEEN DATES
    // ==========================

    List<Bill> findByBillDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );





    // ==========================
    // BILLS BY CUSTOMER NAME
    // ==========================

    List<Bill> findByCustomer_NameContainingIgnoreCase(
            String customerName
    );





    // ==========================
    // RECENT BILLS
    // ==========================

    List<Bill> findTop5ByOrderByBillDateDesc();





    // ==========================
    // COUNT BILLS BETWEEN DATES
    // ==========================

    long countByBillDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );





    // ==========================
    // SALES BETWEEN DATES
    // ==========================

    @Query("""
            SELECT COALESCE(SUM(b.totalAmount),0)
            FROM Bill b
            WHERE b.billDate BETWEEN :start AND :end
            """)
    Double getTotalSalesBetween(
            LocalDateTime start,
            LocalDateTime end
    );





    // ==========================
    // TODAY SALES
    // ==========================

    @Query("""
            SELECT COALESCE(SUM(b.totalAmount),0)
            FROM Bill b
            WHERE b.billDate BETWEEN :start AND :end
            """)
    Double getTodaySales(
            LocalDateTime start,
            LocalDateTime end
    );


}