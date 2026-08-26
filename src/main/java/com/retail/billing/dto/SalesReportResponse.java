package com.retail.billing.dto;

public class SalesReportResponse {

    private long totalBills;
    private double totalSales;
    private double averageBillAmount;

    public SalesReportResponse() {
    }

    public SalesReportResponse(long totalBills,
                               double totalSales,
                               double averageBillAmount) {
        this.totalBills = totalBills;
        this.totalSales = totalSales;
        this.averageBillAmount = averageBillAmount;
    }

    public long getTotalBills() {
        return totalBills;
    }

    public void setTotalBills(long totalBills) {
        this.totalBills = totalBills;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public double getAverageBillAmount() {
        return averageBillAmount;
    }

    public void setAverageBillAmount(double averageBillAmount) {
        this.averageBillAmount = averageBillAmount;
    }
}