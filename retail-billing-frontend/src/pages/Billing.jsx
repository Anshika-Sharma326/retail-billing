import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

function Billing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [bill, setBill] = useState({
    customerId: "",
    payment: "",
    productId: "",
    quantity: 1,
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadProducts();
    loadCustomers();
  }, []);

  // ==========================
  // Load Products
  // ==========================

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load products.");
    }
  };

  // ==========================
  // Load Customers
  // ==========================

  const loadCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load customers.");
    }
  };

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add Product To Cart
  // ==========================

  const addToCart = () => {
    if (!bill.productId) {
      alert("Please select a product.");
      return;
    }

    const selectedProduct = products.find(
      (product) => product.id === Number(bill.productId)
    );

    if (!selectedProduct) {
      alert("Product not found.");
      return;
    }

    if (bill.quantity <= 0) {
      alert("Quantity should be greater than 0.");
      return;
    }

    const newItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.productName,
      price: selectedProduct.price,
      quantity: Number(bill.quantity),
      total: selectedProduct.price * Number(bill.quantity),
    };

    setCart([...cart, newItem]);

    setBill({
      ...bill,
      productId: "",
      quantity: 1,
    });
  };

  // ==========================
  // Remove Product
  // ==========================

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ==========================
  // Grand Total
  // ==========================

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // ==========================
  // Create Bill
  // ==========================

  const createBill = async () => {
    if (!bill.customerId) {
      alert("Please select customer.");
      return;
    }

    if (!bill.payment) {
      alert("Please select payment method.");
      return;
    }

    if (cart.length === 0) {
      alert("Please add products.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const request = {
        customerId: Number(bill.customerId),
        payment: bill.payment,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const response = await api.post("/bills", request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/invoice", {
        state: response.data,
      });

    } catch (error) {
      console.error(error);
      alert("Unable to create bill.");
    }
  };

  // ==========================
  // JSX STARTS HERE
  // ==========================
  return (
  <Box
    sx={{
      p: 3,
      maxWidth: 900,
      mx: "auto",
    }}
  >
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>

        {/* Customer Details */}

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Customer Details
        </Typography>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Select Customer"
          name="customerId"
          value={bill.customerId}
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <MenuItem
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Payment Method"
          name="payment"
          value={bill.payment}
          onChange={handleChange}
        >
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Card">Card</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
        </TextField>

        <Divider sx={{ my: 4 }} />

        {/* Product Details */}

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Product Details
        </Typography>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Select Product"
          name="productId"
          value={bill.productId}
          onChange={handleChange}
        >
          {products.map((product) => (
            <MenuItem
              key={product.id}
              value={product.id}
            >
              {product.productName} (₹{product.price})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Quantity"
          name="quantity"
          value={bill.quantity}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            height: 50,
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={addToCart}
        >
          Add To Cart
        </Button>

        <Divider sx={{ my: 4 }} />

        {/* Order Summary */}

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Order Summary
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {cart.length > 0 ? (

                cart.map((item) => (

                  <TableRow key={item.id}>

                    <TableCell>{item.name}</TableCell>

                    <TableCell align="center">
                      {item.quantity}
                    </TableCell>

                    <TableCell align="right">
                      ₹{item.total}
                    </TableCell>

                    <TableCell align="center">

                      <Button
                        color="error"
                        size="small"
                        onClick={() => removeItem(item.id)}
                      >
                        X
                      </Button>

                    </TableCell>

                  </TableRow>

                ))

              ) : (

                <TableRow>

                  <TableCell
                    colSpan={4}
                    align="center"
                  >
                    No Products Added
                  </TableCell>

                </TableRow>

              )}

            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography fontWeight="bold">
            Items
          </Typography>

          <Typography>
            {cart.length}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Grand Total
          </Typography>

          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
          >
            ₹{grandTotal}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            height: 55,
            borderRadius: 2,
            fontWeight: "bold",
            fontSize: 16,
          }}
          onClick={createBill}
        >
          Generate Invoice
        </Button>

      </CardContent>
    </Card>
  </Box>
);
}
export default Billing