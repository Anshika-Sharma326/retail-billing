import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";

import ProductTable from "../components/ProductTable";
import AddProductDialog from "../components/AddProductDialog";

function Products() {
  const [open, setOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================
  // Load Products
  // ==========================

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products.");
    }
  };

  // ==========================
  // Add Product
  // ==========================

  const addProduct = async (newProduct) => {
    try {
      await api.post("/products", newProduct);

      loadProducts();

      setOpen(false);
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Unable to add product.");
    }
  };

  // ==========================
  // Update Product
  // ==========================

  const editProduct = async (updatedProduct) => {
    try {
      await api.put(
        `/products/${updatedProduct.id}`,
        updatedProduct
      );

      loadProducts();

      setOpen(false);

      setSelectedProduct(null);
    } catch (error) {
      console.error("Update Product Error:", error);
      alert("Unable to update product.");
    }
  };

  // ==========================
  // Delete Product
  // ==========================

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      loadProducts();
    } catch (error) {
      console.error("Delete Product Error:", error);
      alert("Unable to delete product.");
    }
  };

  // ==========================
  // Edit Button
  // ==========================

  const handleEdit = (product) => {
    setSelectedProduct(product);

    setOpen(true);
  };

  // ==========================
  // Search
  // ==========================

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.productName.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          

          <Typography variant="body2">
            Total Products : {products.length}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Search */}

      <Paper
        sx={{
          p: 2,
          mt: 3,
        }}
      >
        <TextField
          fullWidth
          label="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      {/* Product Table */}

      <ProductTable
        products={filteredProducts}
        deleteProduct={deleteProduct}
        handleEdit={handleEdit}
      />

      {/* Dialog */}

      <AddProductDialog
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
        addProduct={addProduct}
        editProduct={editProduct}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
}

export default Products;