package com.retail.billing.dto;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;



public class BillRequest {


    @NotNull(message = "Customer id is required")
    private Long customerId;



    @NotEmpty(message = "Bill items cannot be empty")
    @Valid
    private List<BillItemRequest> items;
    private String payment;
    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }




    public BillRequest() {

    }




    public BillRequest(
            Long customerId,
            List<BillItemRequest> items) {

        this.customerId = customerId;
        this.items = items;

    }




    public Long getCustomerId() {
        return customerId;
    }



    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }




    public List<BillItemRequest> getItems() {
        return items;
    }



    public void setItems(List<BillItemRequest> items) {
        this.items = items;
    }

}