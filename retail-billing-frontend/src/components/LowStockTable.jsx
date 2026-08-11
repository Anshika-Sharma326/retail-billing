import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Avatar,
  Box
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";

function LowStockTable({ products }) {

  return (

    <TableContainer
      component={Paper}
      elevation={0}
    >

      <Table>

        <TableHead>

          <TableRow
            sx={{
              background: "#1976d2"
            }}
          >

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Product
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Category
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Stock
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Status
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {

            products.length > 0 ?

              (

                products.map((product) => (

                  <TableRow
                    key={product.id}
                    hover
                    sx={{
                      transition: ".2s",

                      "&:hover": {
                        background: "#f5f5f5"
                      }
                    }}
                  >

                    <TableCell>

                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >

                        <Avatar
                          sx={{
                            bgcolor: "#1976d2",
                            width: 35,
                            height: 35
                          }}
                        >

                          <Inventory2Icon fontSize="small" />

                        </Avatar>

                        <Typography fontWeight="600">

                          {product.productName}

                        </Typography>

                      </Box>

                    </TableCell>

                    <TableCell>

                      {product.category}

                    </TableCell>

                    <TableCell align="center">

                      <Typography
                        fontWeight="bold"
                        color="error"
                      >
                        {product.quantity}
                      </Typography>

                    </TableCell>

                    <TableCell align="center">

                      <Chip
                        label={
                          product.quantity <= 2
                            ? "Critical"
                            : "Low Stock"
                        }
                        color={
                          product.quantity <= 2
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />

                    </TableCell>

                  </TableRow>

                ))

              )

              :

              (

                <TableRow>

                  <TableCell
                    colSpan={4}
                    align="center"
                  >

                    <Typography
                      color="text.secondary"
                    >

                      No Low Stock Products

                    </Typography>

                  </TableCell>

                </TableRow>

              )

          }

        </TableBody>

      </Table>

    </TableContainer>

  );

}

export default LowStockTable;