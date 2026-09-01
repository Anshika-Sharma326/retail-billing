package com.retail.billing.dto;

public class ReportResponse {

    private Long totalBills;
    private Double totalSales;
    private Double averageBillAmount;

    public ReportResponse() {
    }

    public ReportResponse(Long totalBills,
                          Double totalSales,
                          Double averageBillAmount) {
        this.totalBills = totalBills;
        this.totalSales = totalSales;
        this.averageBillAmount = averageBillAmount;
    }

    public Long getTotalBills() {
        return totalBills;
    }

    public void setTotalBills(Long totalBills) {
        this.totalBills = totalBills;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }

    public Double getAverageBillAmount() {
        return averageBillAmount;
    }

    public void setAverageBillAmount(Double averageBillAmount) {
        this.averageBillAmount = averageBillAmount;
    }
}