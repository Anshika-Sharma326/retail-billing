import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

function ProductTable({
  products,
  deleteProduct,
  handleEdit,
}) {
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedId);

    setOpenDelete(false);

    setSelectedId(null);
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
              <TableCell><b>ID</b></TableCell>

              <TableCell><b>Product Name</b></TableCell>

              <TableCell><b>Category</b></TableCell>

              <TableCell><b>Price</b></TableCell>

              <TableCell><b>Quantity</b></TableCell>

              <TableCell><b>Status</b></TableCell>

              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                >
                  <TableCell>
                    {product.id}
                  </TableCell>

                  <TableCell>
                    {product.productName}
                  </TableCell>

                  <TableCell>
                    {product.category}
                  </TableCell>

                  <TableCell>
                    ₹{product.price}
                  </TableCell>

                  <TableCell>
                    {product.quantity}
                  </TableCell>

                  <TableCell>
                    {product.quantity < 5 ? (
                      <Chip
                        label="Low Stock"
                        color="error"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="In Stock"
                        color="success"
                        size="small"
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDeleteClick(product.id)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                >
                  <Typography>
                    No Products Found
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
          Delete Product
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
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

export default ProductTable;