package com.retail.billing.service;


import com.retail.billing.dto.BillItemRequest;
import com.retail.billing.dto.BillRequest;

import com.retail.billing.entity.Bill;
import com.retail.billing.entity.BillItem;
import com.retail.billing.entity.Customer;
import com.retail.billing.entity.Product;

import com.retail.billing.exception.BillNotFoundException;

import com.retail.billing.repository.BillItemRepository;
import com.retail.billing.repository.BillRepository;
import com.retail.billing.repository.CustomerRepository;
import com.retail.billing.repository.ProductRepository;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;



@Service
public class BillService {



    private final BillRepository billRepository;
    private final BillItemRepository billItemRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;




    public BillService(
            BillRepository billRepository,
            BillItemRepository billItemRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository) {

        this.billRepository = billRepository;
        this.billItemRepository = billItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;

    }





    // ==========================
    // GET ALL BILLS
    // ==========================

    public List<Bill> getAllBills() {

        return billRepository.findAll();

    }





    // ==========================
    // GET BILL BY ID
    // ==========================

    public Bill getBillById(Long id) {

        return billRepository.findById(id)

                .orElseThrow(() ->
                        new BillNotFoundException(
                                "Bill not found with id: " + id
                        ));

    }





    // ==========================
    // RECENT BILLS
    // ==========================

    public List<Bill> getRecentBills() {

        return billRepository
                .findTop5ByOrderByBillDateDesc();

    }





    // ==========================
    // CREATE BILL
    // ==========================

    @Transactional
    public Bill createBill(BillRequest request) {


        Customer customer =
                customerRepository.findById(
                                request.getCustomerId()
                        )

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer not found"
                                ));




        Bill bill = new Bill();

        bill.setCustomer(customer);

        bill.setBillDate(LocalDateTime.now());
        bill.setPayment(request.getPayment());
        bill.setTotalAmount(0.0);



        double totalAmount = 0.0;




        for(BillItemRequest itemRequest : request.getItems()) {


            Product product =
                    productRepository.findById(
                                    itemRequest.getProductId()
                            )

                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Product not found"
                                    ));





            if(product.getQuantity() < itemRequest.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for product: "
                                + product.getProductName()
                );

            }





            // Reduce Stock

            product.setQuantity(
                    product.getQuantity()
                            - itemRequest.getQuantity()
            );


            productRepository.save(product);





            // Create Bill Item

            BillItem billItem = new BillItem();


            billItem.setProduct(product);

            billItem.setQuantity(
                    itemRequest.getQuantity()
            );


            billItem.setPrice(
                    product.getPrice()
            );


            double itemTotal =
                    product.getPrice()
                            * itemRequest.getQuantity();


            billItem.setTotalPrice(itemTotal);


            bill.addItem(billItem);


            totalAmount += itemTotal;

        }



        bill.setTotalAmount(totalAmount);


        return billRepository.save(bill);

    }





    // ==========================
    // CUSTOMER BILL HISTORY
    // ==========================

    public List<Bill> getBillsByCustomer(String name) {

        return billRepository
                .findByCustomer_NameContainingIgnoreCase(name);

    }





    // ==========================
    // DATE WISE BILL
    // ==========================

    public List<Bill> getBillsBetweenDates(
            LocalDateTime start,
            LocalDateTime end) {


        return billRepository
                .findByBillDateBetween(start, end);

    }





    // ==========================
    // DELETE BILL
    // ==========================

    public String deleteBill(Long id) {


        Bill bill = getBillById(id);


        billRepository.delete(bill);


        return "Bill deleted successfully.";

    }





    // ==========================
    // TOTAL SALES
    // ==========================

    public Double getTotalSales() {

        return billRepository.getTotalSales();

    }





    // ==========================
    // TODAY SALES
    // ==========================

    public Double getTodaySales(
            LocalDateTime start,
            LocalDateTime end) {


        return billRepository.getTodaySales(start, end);

    }





    // ==========================
    // TOP SELLING PRODUCTS
    // ==========================

    public List<Object[]> getTopSellingProducts() {

        return billItemRepository.findTopSellingProducts();

    }

}