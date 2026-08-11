package com.retail.billing.repository;


import com.retail.billing.entity.BillItem;
import com.retail.billing.entity.Bill;
import com.retail.billing.entity.Product;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;



@Repository
public interface BillItemRepository
        extends JpaRepository<BillItem, Long> {



    // ==========================
    // GET ITEMS OF A BILL
    // ==========================

    List<BillItem> findByBill(Bill bill);





    // ==========================
    // GET SALES OF A PRODUCT
    // ==========================

    List<BillItem> findByProduct(Product product);





    // ==========================
    // TOP SELLING PRODUCTS
    // ==========================

    @Query("""
            SELECT
                b.product.productName,
                SUM(b.quantity),
                SUM(b.totalPrice)
            FROM BillItem b
            GROUP BY b.product.productName
            ORDER BY SUM(b.quantity) DESC
            """)
    List<Object[]> findTopSellingProducts();


}