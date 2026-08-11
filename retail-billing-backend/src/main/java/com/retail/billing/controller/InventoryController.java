package com.retail.billing.controller;


import com.retail.billing.dto.TopSellingProductResponse;
import com.retail.billing.entity.Product;
import com.retail.billing.service.InventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/inventory")
public class InventoryController {


    @Autowired
    private InventoryService inventoryService;



    @GetMapping("/low-stock")
    public List<Product> lowStock(){

        return inventoryService.getLowStockProducts();

    }



    @GetMapping("/top-selling")
    public List<TopSellingProductResponse> topSelling(){

        return inventoryService.getTopSellingProducts();

    }

}