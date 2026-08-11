import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

// Material UI
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid";
// Icons
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// Components
import DashboardCard from "../components/DashboardCard";
import SalesChart from "../components/SalesChart";
import TopProducts from "../components/TopProducts";
import CategoryProgress from "../components/CategoryProgress";
import LowStockTable from "../components/LowStockTable";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalBills: 0,
    totalSales: 0,
    lowStockProducts: 0,
    todaySales: 0,
});

  const [bills, setBills] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadBills();
    loadLowStock();
  }, []);

  // Dashboard Summary

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Bills

 const loadBills = async () => {
    try {
        const response = await api.get("/bills");

        console.log("BILLS FROM API:", response.data);

        setBills(response.data);

    } catch (error) {
        console.log("Bills Error:", error);
    }
};

  // Low Stock Products

  const loadLowStock = async () => {
    try {
      const response = await api.get("/products/low-stock");
      setLowStock(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <Box
      sx={{
        width: "100%",
    maxWidth: "100%",
    p: 3,
    background: "#f5f7fb",
    minHeight: "100vh"
      }}
    >
     {/* ================= WELCOME BANNER ================= */}
<Box
  sx={{
    mb: 3,
    p: 3,
    borderRadius: 3,
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "white",
    boxShadow: "0 6px 18px rgba(25, 118, 210, 0.2)",
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      mb: 1,
    }}
  >
    Welcome back, {localStorage.getItem("fullName") || "Admin"} 👋
  </Typography>

  <Typography
    variant="body1"
    sx={{
      opacity: 0.9,
      mb: 2,
    }}
  >
    Here's what's happening with your store today.
  </Typography>

  
</Box>
           {/* Summary Cards */}

     <Grid
  container
  spacing={4}
  sx={{
    width: "100%",
    m: 0,
    mb: 4
  }}
>

        {/* Total Sales */}
<Grid
  size={{
    xs: 12,
    sm: 6,
    md: 3,
  }}
>

          <DashboardCard
            title="Total Sales"
            value={`₹${dashboard.totalSales}`}
            color="#66BB6A"
            icon={<CurrencyRupeeIcon fontSize="large" />}
          />

        </Grid>

        {/* Today's Sales */}

        <Grid
  size={{
    xs: 12,
    sm: 6,
    lg: 3,
  }}
>

          <DashboardCard
            title="Today's Sales"
            value={`₹${dashboard.todaySales}`}
            color="#5C6BC0"
            icon={<TodayIcon fontSize="large" />}
          />

        </Grid>

        {/* Customers */}

        <Grid
  size={{
    xs: 12,
    sm: 6,
    lg: 3,
  }}
>

          <DashboardCard
            title="Customers"
            value={dashboard.totalCustomers}
            color="#FFB74D"
            icon={<PeopleIcon fontSize="large" />}
          />

        </Grid>

        {/* Low Stock */}

        <Grid
  size={{
    xs: 12,
    sm: 6,
    lg: 3,
  }}
>

          <DashboardCard
            title="Low Stock"
            value={dashboard.lowStockProducts}
            color="#EF5350"
            icon={<WarningAmberIcon fontSize="large" />}
          />

        </Grid>
        </Grid>
 {/* Charts Section */}

<Grid
  container
  spacing={4}
  sx={{
    mt: 1,
    width: "100%",
  }}
>

  {/* Monthly Sales */}

  <Grid
    size={{
      xs: 12,
      lg: 8,
    }}
  >
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 5,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          📈 Monthly Sales
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Last 12 Months
        </Typography>
      </Box>

      <SalesChart bills={bills} />
    </Paper>
  </Grid>


  {/* Top Products */}

  <Grid
    size={{
      xs: 12,
      lg: 4,
    }}
  >
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 5,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          🏆 Top Products
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Top 5
        </Typography>
      </Box>

      <TopProducts bills={bills} />
    </Paper>
  </Grid>

</Grid>


{/* Bottom Analytics */}

<Grid
  container
  spacing={4}
  sx={{
    width: "100%",
    mt: 3,
    mb: 3,
  }}
>

        {/* Low Stock */}

        <Grid
  size={{
    xs: 12,
    lg: 6,
  }}
>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "100%"
            }}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                📦 Low Stock Alert
              </Typography>

              <Typography
                variant="body2"
                color="error.main"
                fontWeight="bold"
              >
                {dashboard.lowStockProducts} Items
              </Typography>

            </Box>

            <LowStockTable products={lowStock} />

          </Paper>

        </Grid>

        {/* Sales By Category */}

        <Grid
  size={{
    xs: 12,
    lg: 6,
  }}
>

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "100%"
            }}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >

              <Typography
                variant="h6"
                fontWeight="bold"
              >
                📊 Sales By Category
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Category Wise
              </Typography>

            </Box>

            <CategoryProgress bills={bills} />

          </Paper>

        </Grid>

      </Grid>
      {/* Recent Bills */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 5,
          overflow: "hidden",
          mb: 2
        }}
      >

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            🧾 Recent Bills
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Last 5 Bills
          </Typography>

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow
                sx={{
                  background: "#f5f5f5"
                }}
              >

                <TableCell sx={{ fontWeight: "bold" }}>
                  Bill ID
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }}>
                  Customer
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  Amount
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  Date
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {
                bills.length > 0 ? (

                 bills
  .slice()
  .sort((a, b) => b.id - a.id)
  .slice(0, 5)
  .map((bill) => (

                      <TableRow
                        key={bill.id}
                        hover
                      >

                        <TableCell>

                          #{bill.id}

                        </TableCell>

                        <TableCell>

                          {bill.customer?.name || "Walk-in Customer"}

                        </TableCell>

                        <TableCell align="center">

                          <Typography
                            fontWeight="bold"
                            color="success.main"
                          >
                            ₹{bill.totalAmount}
                          </Typography>

                        </TableCell>

                        <TableCell align="center">

                          {new Date(
                            bill.billDate
                          ).toLocaleDateString("en-IN")}

                        </TableCell>

                      </TableRow>

                    ))

                ) : (

                  <TableRow>

                    <TableCell
                      colSpan={4}
                      align="center"
                    >

                      <Typography
                        color="text.secondary"
                        sx={{ py: 3 }}
                      >
                        No Bills Found
                      </Typography>

                    </TableCell>

                  </TableRow>

                )
              }

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>

  );

}

export default Dashboard;