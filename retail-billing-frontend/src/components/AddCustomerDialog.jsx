import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function AddCustomerDialog({
  open,
  handleClose,
  selectedCustomer,
  loadCustomers,
}) {

  const initialState = {
    name: "",
    mobile: "",
    email: "",
    address: "",
  };

  const [customer, setCustomer] = useState(initialState);

  useEffect(() => {

    if (selectedCustomer) {

      setCustomer({
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        mobile: selectedCustomer.mobile,
        email: selectedCustomer.email,
        address: selectedCustomer.address,
      });

    } else {

      setCustomer(initialState);

    }

  }, [selectedCustomer, open]);

  const handleChange = (e) => {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    const name = customer.name.trim();
    const mobile = customer.mobile.trim();
    const email = customer.email.trim();
    const address = customer.address.trim();

    if (
      !name ||
      !mobile ||
      !email ||
      !address
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const request = {
        name,
        mobile,
        email,
        address,
      };

      if (selectedCustomer) {

        await api.put(
          `/customers/${selectedCustomer.id}`,
          request,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Customer Updated Successfully");

      } else {

        await api.post(
          "/customers",
          request,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      loadCustomers();

      setCustomer(initialState);

      handleClose();

    } catch (error) {

      console.error(error);

      alert("Unable to save customer.");

    }

  };

  const closeDialog = () => {

    setCustomer(initialState);

    handleClose();

  };

  return (

    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        {selectedCustomer
          ? "Edit Customer"
          : "Add Customer"}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Customer Name"
          name="name"
          value={customer.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Mobile Number"
          name="mobile"
          value={customer.mobile}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={customer.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={customer.address}
          onChange={handleChange}
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={closeDialog}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {selectedCustomer
            ? "Update"
            : "Add Customer"}
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default AddCustomerDialog;