package com.retail.billing.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer Relation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false)
    private LocalDateTime billDate;

    @Column(nullable = false)
    private Double totalAmount = 0.0;
    @Column(nullable = false)
    private String payment;
    @OneToMany(
            mappedBy = "bill",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<BillItem> items = new ArrayList<>();
    public Bill() {
    }

    public Bill(Long id, Customer customer, LocalDateTime billDate,
                Double totalAmount,String payment, List<BillItem> items) {
        this.id = id;
        this.customer = customer;
        this.billDate = billDate;
        this.totalAmount = totalAmount;
        this.payment = payment;
        this.items = items;
    }

    @PrePersist
    public void prePersist() {
        if (billDate == null) {
            billDate = LocalDateTime.now();
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }

    public void setBillDate(LocalDateTime billDate) {
        this.billDate = billDate;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<BillItem> getItems() {
        return items;
    }

    public void setItems(List<BillItem> items) {
        this.items = items;
    }
    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }
    public void addItem(BillItem item) {
        items.add(item);
        item.setBill(this);
    }

    public void removeItem(BillItem item) {
        items.remove(item);
        item.setBill(null);
    }
}