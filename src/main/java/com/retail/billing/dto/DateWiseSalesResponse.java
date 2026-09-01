package com.retail.billing.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.retail.billing.entity.Bill;

public class DateWiseSalesResponse {

    private LocalDateTime fromDate;
    private LocalDateTime toDate;

    private long totalBills;
    private double totalSales;

    private List<Bill> bills;

    public DateWiseSalesResponse() {
    }

    public DateWiseSalesResponse(LocalDateTime fromDate,
                                 LocalDateTime toDate,
                                 long totalBills,
                                 double totalSales,
                                 List<Bill> bills) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.totalBills = totalBills;
        this.totalSales = totalSales;
        this.bills = bills;
    }

    public LocalDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDateTime getToDate() {
        return toDate;
    }

    public void setToDate(LocalDateTime toDate) {
        this.toDate = toDate;
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

    public List<Bill> getBills() {
        return bills;
    }

    public void setBills(List<Bill> bills) {
        this.bills = bills;
    }
}