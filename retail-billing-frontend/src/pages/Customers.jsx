import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";

import CustomerTable from "../components/CustomerTable";
import AddCustomerDialog from "../components/AddCustomerDialog";

function Customers() {

  const [open, setOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

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

      alert("Failed to load customers.");

    }

  };

  // ==========================
  // Edit Customer
  // ==========================

  const handleEdit = (customer) => {

    setSelectedCustomer(customer);

    setOpen(true);

  };

  // ==========================
  // Search
  // ==========================

  const filteredCustomers = customers.filter((customer) => {

    const keyword = search.toLowerCase();

    return (

      customer.name.toLowerCase().includes(keyword) ||

      customer.mobile.includes(search) ||

      customer.email.toLowerCase().includes(keyword)

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

         <Typography>
            Total Customers : {customers.length}
          </Typography>

        </Box>

        <Button
          variant="contained"
          onClick={() => {

            setSelectedCustomer(null);

            setOpen(true);

          }}
        >
          Add Customer
        </Button>

      </Box>

      {/* Search */}

      <Paper
        sx={{
          mt: 3,
          p: 2,
        }}
      >

        <TextField
          fullWidth
          label="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </Paper>

      {/* Customer Table */}

      <CustomerTable
        customers={filteredCustomers}
        loadCustomers={loadCustomers}
        handleEdit={handleEdit}
      />

      {/* Dialog */}

      <AddCustomerDialog
        open={open}
        handleClose={() => {

          setOpen(false);

          setSelectedCustomer(null);

        }}
        selectedCustomer={selectedCustomer}
        loadCustomers={loadCustomers}
      />

    </Box>

  );

}

export default Customers;