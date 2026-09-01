package com.retail.billing.service;

import com.retail.billing.entity.Product;
import com.retail.billing.enums.ProductStatus;
import com.retail.billing.exception.ProductNotFoundException;
import com.retail.billing.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ==========================
    // ADD PRODUCT
    // ==========================

    public Product addProduct(Product product) {

        boolean exists = productRepository
                .existsByProductNameIgnoreCase(product.getProductName());

        if (exists) {
            throw new RuntimeException(
                    "Product already exists with name: "
                            + product.getProductName()
            );
        }

        // IMPORTANT
        product.setStatus(ProductStatus.ACTIVE);

        return productRepository.save(product);
    }

    // ==========================
    // SEARCH PRODUCT
    // ==========================

    public List<Product> searchProducts(String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return productRepository.findByStatus(ProductStatus.ACTIVE);
        }

        return productRepository
                .findByProductNameContainingIgnoreCase(keyword);
    }

    // ==========================
    // GET ALL PRODUCTS
    // ==========================

    public List<Product> getAllProducts() {

        return productRepository.findByStatus(ProductStatus.ACTIVE);
    }

    // ==========================
    // GET PRODUCT BY ID
    // ==========================

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));
    }

    // ==========================
    // UPDATE PRODUCT
    // ==========================

    public Product updateProduct(
            Long id,
            Product updatedProduct) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));

        if (updatedProduct.getProductName() != null) {
            existingProduct.setProductName(
                    updatedProduct.getProductName()
            );
        }

        if (updatedProduct.getCategory() != null) {
            existingProduct.setCategory(
                    updatedProduct.getCategory()
            );
        }

        if (updatedProduct.getPrice() != null) {
            existingProduct.setPrice(
                    updatedProduct.getPrice()
            );
        }

        if (updatedProduct.getQuantity() != null) {
            existingProduct.setQuantity(
                    updatedProduct.getQuantity()
            );
        }

        return productRepository.save(existingProduct);
    }

    // ==========================
    // DELETE PRODUCT
    // ==========================

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id : " + id
                        ));

        // Soft delete
        product.setStatus(ProductStatus.INACTIVE);

        productRepository.save(product);
    }

    // ==========================
    // LOW STOCK PRODUCTS
    // ==========================

    public List<Product> getLowStockProducts() {

        return productRepository.findByQuantityLessThan(5);
    }
}