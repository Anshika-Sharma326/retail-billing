package com.retail.billing.dto;

public class TopSellingProductResponse {

    private String productName;
    private Long totalQuantitySold;
    private Double totalRevenue;

    public TopSellingProductResponse() {
    }

    public TopSellingProductResponse(String productName,
                                     Long totalQuantitySold,
                                     Double totalRevenue) {
        this.productName = productName;
        this.totalQuantitySold = totalQuantitySold;
        this.totalRevenue = totalRevenue;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getTotalQuantitySold() {
        return totalQuantitySold;
    }

    public void setTotalQuantitySold(Long totalQuantitySold) {
        this.totalQuantitySold = totalQuantitySold;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}