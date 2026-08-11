package com.retail.billing.dto;

import java.time.Month;

public class MonthlySalesResponse {

    private int year;
    private Month month;
    private long totalBills;
    private double totalSales;

    public MonthlySalesResponse() {
    }

    public MonthlySalesResponse(int year, Month month,
                                long totalBills,
                                double totalSales) {
        this.year = year;
        this.month = month;
        this.totalBills = totalBills;
        this.totalSales = totalSales;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
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
}