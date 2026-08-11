import React, { useState } from "react";
import api from "../api/axiosConfig";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

function CustomerTable({
  customers,
  loadCustomers,
  handleEdit,
}) {

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/customers/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadCustomers();

      setOpenDelete(false);
      setSelectedId(null);

    } catch (error) {

      console.error(error);

      alert("Unable to delete customer.");

    }

  };

  const cancelDelete = () => {

    setOpenDelete(false);
    setSelectedId(null);

  };

  return (
    <>

      <TableContainer
        component={Paper}
        sx={{ mt: 3 }}
      >

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {customers.length > 0 ? (

              customers.map((customer) => (

                <TableRow
                  key={customer.id}
                  hover
                >

                  <TableCell>{customer.id}</TableCell>

                  <TableCell>{customer.name}</TableCell>

                  <TableCell>{customer.mobile}</TableCell>

                  <TableCell>{customer.email}</TableCell>

                  <TableCell>{customer.address}</TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(customer.id)}
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >

                  <Typography>
                    No Customers Found
                  </Typography>

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

      <Dialog
        open={openDelete}
        onClose={cancelDelete}
      >

        <DialogTitle>
          Delete Customer
        </DialogTitle>

        <DialogContent>

          <DialogContentText>
            Are you sure you want to delete this customer?
          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button onClick={cancelDelete}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );
}

export default CustomerTable;