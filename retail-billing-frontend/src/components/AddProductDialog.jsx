import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function AddProductDialog({
  open,
  handleClose,
  addProduct,
  editProduct,
  selectedProduct,
}) {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        id: selectedProduct.id,
        productName: selectedProduct.productName,
        category: selectedProduct.category,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      });
    } else {
      setProduct({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });
    }
  }, [selectedProduct, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      product.productName.trim() === "" ||
      product.category.trim() === "" ||
      product.price === "" ||
      product.quantity === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(product.price) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    if (Number(product.quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    const request = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    if (selectedProduct) {
      editProduct(request);
    } else {
      addProduct(request);
    }

    setProduct({
      productName: "",
      category: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {selectedProduct ? "Edit Product" : "Add New Product"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="productName"
          value={product.productName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {selectedProduct ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductDialog;