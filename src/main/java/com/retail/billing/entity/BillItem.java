package com.retail.billing.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;



@Entity
@Table(name = "bill_items")
public class BillItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    // Many BillItems belong to one Bill
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id", nullable = false)
    @JsonBackReference
    private Bill bill;




    // One Product can appear in many bills
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;




    @Min(value = 1, message = "Quantity must be greater than 0")
    @Column(nullable = false)
    private Integer quantity;




    @Column(nullable = false)
    private Double price;




    @Column(nullable = false)
    private Double totalPrice;



    public BillItem() {

    }



    public BillItem(Long id,
                    Bill bill,
                    Product product,
                    Integer quantity,
                    Double price,
                    Double totalPrice) {

        this.id = id;
        this.bill = bill;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;

    }





    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }




    public Bill getBill() {
        return bill;
    }


    public void setBill(Bill bill) {
        this.bill = bill;
    }




    public Product getProduct() {
        return product;
    }


    public void setProduct(Product product) {
        this.product = product;
    }




    public Integer getQuantity() {
        return quantity;
    }


    public void setQuantity(Integer quantity) {

        this.quantity = quantity;
        calculateTotal();

    }




    public Double getPrice() {
        return price;
    }


    public void setPrice(Double price) {

        this.price = price;
        calculateTotal();

    }




    public Double getTotalPrice() {
        return totalPrice;
    }


    public void setTotalPrice(Double totalPrice) {

        this.totalPrice = totalPrice;

    }




    private void calculateTotal() {

        if(quantity != null && price != null) {

            this.totalPrice = quantity * price;

        }

    }

}