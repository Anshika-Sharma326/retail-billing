package com.retail.billing.dto;


public class DashboardResponse {


    private Long totalProducts;

    private Long totalCustomers;

    private Long totalBills;

    private Double totalSales;

    private Long lowStockProducts;

    private Double todaySales;



    public DashboardResponse() {

    }



    public DashboardResponse(
            Long totalProducts,
            Long totalCustomers,
            Long totalBills,
            Double totalSales,
            Long lowStockProducts,
            Double todaySales) {


        this.totalProducts = totalProducts;
        this.totalCustomers = totalCustomers;
        this.totalBills = totalBills;
        this.totalSales = totalSales;
        this.lowStockProducts = lowStockProducts;
        this.todaySales = todaySales;

    }



    public Long getTotalProducts() {
        return totalProducts;
    }


    public void setTotalProducts(Long totalProducts) {
        this.totalProducts = totalProducts;
    }



    public Long getTotalCustomers() {
        return totalCustomers;
    }


    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
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



    public Long getLowStockProducts() {
        return lowStockProducts;
    }


    public void setLowStockProducts(Long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }



    public Double getTodaySales() {
        return todaySales;
    }


    public void setTodaySales(Double todaySales) {
        this.todaySales = todaySales;
    }

}