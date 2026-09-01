package com.retail.billing.repository;

import com.retail.billing.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.retail.billing.enums.ProductStatus;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    // ==========================
    // SEARCH PRODUCT BY NAME
    // ==========================
    List<Product> findByProductNameContainingIgnoreCase(String keyword);



    // ==========================
    // LOW STOCK PRODUCTS
    // ==========================
    List<Product> findByQuantityLessThan(Integer quantity);

    List<Product> findByStatus(ProductStatus status);

    // ==========================
    // COUNT LOW STOCK PRODUCTS
    // ==========================
    long countByQuantityLessThan(Integer quantity);



    // ==========================
    // CHECK DUPLICATE PRODUCT NAME
    // ==========================
    boolean existsByProductNameIgnoreCase(String productName);



    // ==========================
    // FIND PRODUCTS BY CATEGORY
    // ==========================
    List<Product> findByCategoryIgnoreCase(String category);

}