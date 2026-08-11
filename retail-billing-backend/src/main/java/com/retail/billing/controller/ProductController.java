package com.retail.billing.controller;


import com.retail.billing.entity.Product;
import com.retail.billing.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductController {


    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }



    // ==========================
    // ADD PRODUCT (ADMIN ONLY)
    // ==========================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> addProduct(
            @Valid @RequestBody Product product) {


        return new ResponseEntity<>(
                productService.addProduct(product),
                HttpStatus.CREATED
        );
    }





    // ==========================
    // GET ALL PRODUCTS
    // ADMIN + STAFF
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<List<Product>> getAllProducts() {


        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }





    // ==========================
    // SEARCH PRODUCT
    // ADMIN + STAFF
    // ==========================

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String keyword) {


        return ResponseEntity.ok(
                productService.searchProducts(keyword)
        );
    }

// ==========================
// LOW STOCK PRODUCTS
// ADMIN + STAFF
// ==========================

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<List<Product>> getLowStockProducts() {

        return ResponseEntity.ok(
                productService.getLowStockProducts()
        );
    }



    // ==========================
    // GET PRODUCT BY ID
    // ADMIN + STAFF
    // ==========================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {


        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }





    // ==========================
    // UPDATE PRODUCT
    // ADMIN ONLY
    // ==========================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {


        return ResponseEntity.ok(
                productService.updateProduct(id, product)
        );
    }





    // ==========================
    // DELETE PRODUCT
    // ADMIN ONLY
    // ==========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {


        productService.deleteProduct(id);


        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }

}