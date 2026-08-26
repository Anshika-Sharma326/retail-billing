package com.retail.billing.service;


import com.retail.billing.dto.DashboardResponse;
import com.retail.billing.repository.BillRepository;
import com.retail.billing.repository.CustomerRepository;
import com.retail.billing.repository.ProductRepository;

import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
public class DashboardService {


    private final ProductRepository productRepository;

    private final CustomerRepository customerRepository;

    private final BillRepository billRepository;


    private static final int LOW_STOCK_LIMIT = 5;



    public DashboardService(
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            BillRepository billRepository) {


        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.billRepository = billRepository;

    }





    public DashboardResponse getDashboardData() {



        Long totalProducts =
                productRepository.count();



        Long totalCustomers =
                customerRepository.count();



        Long totalBills =
                billRepository.count();




        Double totalSales =
                billRepository.getTotalSales();



        if(totalSales == null){
            totalSales = 0.0;
        }




        Long lowStockProducts =
                productRepository
                        .countByQuantityLessThan(LOW_STOCK_LIMIT);





        LocalDate today = LocalDate.now();


        LocalDateTime start =
                today.atStartOfDay();


        LocalDateTime end =
                today.atTime(23,59,59);




        Double todaySales =
                billRepository
                        .getTodaySales(start,end);



        if(todaySales == null){
            todaySales = 0.0;
        }





        return new DashboardResponse(

                totalProducts,

                totalCustomers,

                totalBills,

                totalSales,

                lowStockProducts,

                todaySales

        );


    }

}