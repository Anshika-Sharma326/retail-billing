package com.retail.billing.service;


import com.retail.billing.dto.TopSellingProductResponse;
import com.retail.billing.entity.Product;
import com.retail.billing.repository.ProductRepository;
import com.retail.billing.repository.BillItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class InventoryService {


    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private BillItemRepository billItemRepository;



    public List<Product> getLowStockProducts(){

        return productRepository.findByQuantityLessThan(5);

    }



    public List<TopSellingProductResponse> getTopSellingProducts(){


        List<Object[]> result =
                billItemRepository.findTopSellingProducts();


        List<TopSellingProductResponse> list =
                new ArrayList<>();


        for (Object[] row : result) {

            list.add(
                    new TopSellingProductResponse(
                            (String) row[0],
                            ((Number) row[1]).longValue(),
                            ((Number) row[2]).doubleValue()
                    )
            );

        }


        return list;

    }

}