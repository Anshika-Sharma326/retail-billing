import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Invoice() {

  const invoiceRef = useRef();

  const { state: invoice } = useLocation();

  if (!invoice) {
    return (
      <Box p={4}>
        <Typography>No Invoice Found</Typography>
      </Box>
    );
  }

 const printInvoice = () => {
  const invoiceContent =
    document.querySelector(".invoice-paper");

  if (!invoiceContent) return;

  const printWindow = window.open(
    "",
    "_blank",
    "width=1000,height=800"
  );

  if (!printWindow) {
    alert("Please allow popups for printing.");
    return;
  }

  // Copy all existing styles
  const styles = Array.from(
    document.querySelectorAll(
      'style, link[rel="stylesheet"]'
    )
  )
    .map((style) => style.outerHTML)
    .join("\n");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Retail Billing Invoice</title>

        ${styles}

        <style>

          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background: white !important;
          }

          body {
            font-family: Arial, sans-serif;
          }

          .invoice-paper {
            width: 190mm !important;
            max-width: 190mm !important;
            min-width: 190mm !important;

            margin: 0 auto !important;
            padding: 8mm !important;

            background: white !important;

            box-shadow: none !important;
            border: none !important;

            border-radius: 0 !important;
          }

          .print-btn,
          .sidebar,
          .navbar {
            display: none !important;
          }

          table {
            width: 100% !important;
          }

          th,
          td {
            padding: 8px !important;
          }

          @media print {
            body {
              width: 100% !important;
            }

            .invoice-paper {
              width: 190mm !important;
              max-width: 190mm !important;
              margin: 0 auto !important;
            }
          }

        </style>
      </head>

      <body>

        ${invoiceContent.outerHTML}

      </body>
    </html>
  `);

  printWindow.document.close();

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      setTimeout(() => {
        printWindow.close();
      }, 500);
    }, 500);
  };
};

  return (
    <Box
      sx={{
        background: "#eeeeee",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper
  className="invoice-paper"
  ref={invoiceRef}
  elevation={4}
  sx={{
    width: "100%",
    maxWidth: "850px",
    margin: "auto",
    p: 4,
    borderRadius: 2,
  }}
>

        {/* Header */}

        <Grid container>

          <Grid size={8}>

            <Typography
              sx={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1976d2",
              }}
            >
              Retail Billing System
            </Typography>

            <Typography fontSize={15}>
              ABC Market, Meerut
            </Typography>

            <Typography fontSize={15}>
              Phone : +91 9876543210
            </Typography>

            <Typography fontSize={15}>
              Email : retailbilling@gmail.com
            </Typography>

          </Grid>

          <Grid
            size={4}
            textAlign="right"
          >

            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              INVOICE
            </Typography>

            <Typography fontSize={15}>
              <b>Invoice No :</b> #{invoice.id}
            </Typography>

            <Typography fontSize={15}>
              <b>Date :</b>
            </Typography>

            <Typography fontSize={15}>
              {new Date(invoice.billDate).toLocaleString("en-IN")}
            </Typography>

          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Customer */}

        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            borderRadius: 2,
          }}
        >

          <Typography
            fontWeight={700}
            fontSize={20}
            mb={2}
          >
            Customer Details
          </Typography>

          <Grid container spacing={2}>

            <Grid size={6}>
              <Typography fontSize={15}>
                <b>Name :</b> {invoice.customer?.name}
              </Typography>

              <Typography fontSize={15}>
  <b>Payment :</b> {invoice.payment}
</Typography>
            </Grid>

            <Grid size={6}>

              <Typography fontSize={15}>
                <b>Mobile :</b>{" "}
                {invoice.customer?.mobile}
              </Typography>

              <Typography fontSize={15}>
                <b>Total Items :</b>{" "}
                {invoice.items.length}
              </Typography>

            </Grid>

          </Grid>

        </Paper>

        <Typography
          sx={{
            mt: 4,
            mb: 1,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Products
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
        >
          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <b>Product</b>
                </TableCell>

                <TableCell align="right">
                  <b>Price</b>
                </TableCell>

                <TableCell align="center">
                  <b>Qty</b>
                </TableCell>

                <TableCell align="right">
                  <b>Total</b>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {invoice.items.map((item) => (

                <TableRow key={item.id}>

                  <TableCell>
                    {item.product.productName}
                  </TableCell>

                  <TableCell align="right">
                    ₹{item.price}
                  </TableCell>

                  <TableCell align="center">
                    {item.quantity}
                  </TableCell>

                  <TableCell align="right">
                    ₹{item.totalPrice}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

        <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    mt: 3,
  }}
>
  <Paper
    elevation={2}
    sx={{
      width: 300,
      p: 2.5,
      borderRadius: 2,
    }}
  >
    {/* Total Items */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Total Items
      </Typography>

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {invoice.items.length}
      </Typography>
    </Box>

    <Divider sx={{ mb: 2 }} />

    {/* Grand Total */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1976d2",
          whiteSpace: "nowrap",
        }}
      >
        Grand Total
      </Typography>

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1976d2",
          whiteSpace: "nowrap",
        }}
      >
        ₹{Number(invoice.totalAmount).toLocaleString("en-IN")}
      </Typography>
    </Box>
  </Paper>
</Box>
        <Divider sx={{ my: 5 }} />

        <Grid container>

          <Grid size={6}>

            <Typography
              fontWeight={700}
              color="primary"
              fontSize={22}
            >
              Thank You!
            </Typography>

            <Typography fontSize={14}>
              Thank you for shopping with us.
            </Typography>

            <Typography fontSize={14}>
              We hope to see you again.
            </Typography>

          </Grid>

          <Grid
            size={6}
            textAlign="right"
          >

            <Box
              sx={{
                mt: 5,
                borderTop: "1px solid #999",
                width: 180,
                ml: "auto",
                pt: 1,
              }}
            >
              <Typography fontWeight={600}>
                Authorized Signature
              </Typography>
            </Box>

          </Grid>

        </Grid>

      </Paper>

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
    mb: 4,
  }}
>
  <Button
    className="print-btn"
    variant="contained"
    size="large"
    onClick={printInvoice}
    sx={{
      px: 5,
      py: 1.5,
      borderRadius: "10px",
      textTransform: "none",
      fontWeight: 600,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    }}
  >
    Print Invoice
  </Button>
</Box>
    </Box>
  );
}

export default Invoice;