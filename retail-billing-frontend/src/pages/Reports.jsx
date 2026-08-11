import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReportCard from "../components/ReportCard";
import * as XLSX from "xlsx";

function Reports() {
  // =====================================================
  // STATES
  // =====================================================

  const [dashboard, setDashboard] = useState({
    totalSales: 0,
    totalBills: 0,
    totalCustomers: 0,
  });

  const [bills, setBills] = useState([]);

  const [period, setPeriod] = useState("7");

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadDashboard();
    loadBills();
  }, []);

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  // =====================================================
  // LOAD BILLS
  // =====================================================

  const loadBills = async () => {
    try {
      const response = await api.get("/bills");

      console.log("REPORT BILLS:", response.data);

      setBills(response.data);
    } catch (error) {
      console.error("Bills Error:", error);
    }
  };

  // =====================================================
  // FILTER BILLS ACCORDING TO PERIOD
  // =====================================================

  const filteredBills = bills.filter((bill) => {
    if (!bill.billDate) {
      return false;
    }

    const billDate = new Date(bill.billDate);
    const today = new Date();

    const days = period === "7" ? 7 : 30;

    const startDate = new Date();

    startDate.setDate(
      today.getDate() - (days - 1)
    );

    startDate.setHours(0, 0, 0, 0);

    billDate.setHours(0, 0, 0, 0);

    return (
      billDate >= startDate &&
      billDate <= today
    );
  });

  // =====================================================
  // PRODUCTS SOLD
  // =====================================================

  const productsSold = filteredBills.reduce(
    (sum, bill) =>
      sum +
      (bill.items || []).reduce(
        (itemSum, item) =>
          itemSum + (Number(item.quantity) || 0),
        0
      ),
    0
  );

  // =====================================================
  // PAYMENT METHOD ANALYSIS
  // =====================================================

  const paymentTotals = {};

  filteredBills.forEach((bill) => {
    const paymentMethod =
      bill.payment &&
      bill.payment.trim() !== ""
        ? bill.payment
        : "Unknown";

    if (!paymentTotals[paymentMethod]) {
      paymentTotals[paymentMethod] = 0;
    }

    paymentTotals[paymentMethod] +=
      Number(bill.totalAmount) || 0;
  });

  const paymentData = Object.entries(
    paymentTotals
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // =====================================================
  // PAYMENT COLORS
  // =====================================================

  const PAYMENT_COLORS = {
    Card: "#E11D48",
    Cash: "#16A34A",
    Online: "#0284C7",
    UPI: "#7E22CE",
    Unknown: "#334155",
  };

  // =====================================================
  // SALES HEATMAP
  // =====================================================

  const heatmapDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const heatmapHours = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

  // =====================================================
  // CREATE HEATMAP DATA
  // =====================================================

  const salesHeatmapData = [];

  heatmapDays.forEach((day) => {
    heatmapHours.forEach((hour) => {
      let sales = 0;
      let billsCount = 0;

      filteredBills.forEach((bill) => {
        if (!bill.billDate) {
          return;
        }

        const date = new Date(bill.billDate);

        const billDay =
          date.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
            }
          );

        const billHour = date.getHours();

        if (
          billDay === day &&
          billHour === hour
        ) {
          sales +=
            Number(bill.totalAmount) || 0;

          billsCount++;
        }
      });

      salesHeatmapData.push({
        day,
        hour,
        sales,
        billsCount,
      });
    });
  });

  // =====================================================
  // MAX HEATMAP SALES
  // =====================================================

  const maxHeatmapSales = Math.max(
    ...salesHeatmapData.map(
      (item) => item.sales
    ),
    1
  );

  // =====================================================
  // PEAK SALES HOUR
  // =====================================================

  const peakHourData =
    salesHeatmapData.reduce(
      (max, item) =>
        item.sales > max.sales
          ? item
          : max,
      {
        sales: 0,
        billsCount: 0,
        day: "",
        hour: 0,
      }
    );

  // =====================================================
  // PEAK DAY
  // =====================================================

  const daySales = {};

  heatmapDays.forEach((day) => {
    daySales[day] = 0;
  });

  salesHeatmapData.forEach((item) => {
    daySales[item.day] += item.sales;
  });

  const peakDay = Object.entries(
    daySales
  ).reduce(
    (max, [day, sales]) =>
      sales > max.sales
        ? {
            day,
            sales,
          }
        : max,
    {
      day: "—",
      sales: 0,
    }
  );

  // =====================================================
  // PEAK TIME FORMAT
  // =====================================================

  const formatHour = (hour) => {
    if (hour === 0) {
      return "12 AM";
    }

    if (hour === 12) {
      return "12 PM";
    }

    if (hour > 12) {
      return `${hour - 12} PM`;
    }

    return `${hour} AM`;
  };

  const peakTime =
    peakHourData.sales > 0
      ? `${formatHour(
          peakHourData.hour
        )} - ${formatHour(
          peakHourData.hour + 1
        )}`
      : "No data";

  // =====================================================
  // SALES TREND
  // =====================================================

  const today = new Date();

  const daysToShow =
    period === "7" ? 7 : 30;

  const startDate = new Date();

  startDate.setDate(
    today.getDate() -
      (daysToShow - 1)
  );

  const salesTrendData = [];

  for (
    let i = 0;
    i < daysToShow;
    i++
  ) {
    const currentDate =
      new Date(startDate);

    currentDate.setDate(
      startDate.getDate() + i
    );

    const dateString =
      currentDate.toLocaleDateString(
        "en-CA"
      );

    const salesForDay =
      filteredBills
        .filter((bill) => {
          if (!bill.billDate) {
            return false;
          }

          const billDate =
            new Date(
              bill.billDate
            ).toLocaleDateString(
              "en-CA"
            );

          return (
            billDate === dateString
          );
        })
        .reduce(
          (sum, bill) =>
            sum +
            (Number(
              bill.totalAmount
            ) || 0),
          0
        );

    salesTrendData.push({
      date:
        currentDate.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        ),
      sales: salesForDay,
    });
  }

  // =====================================================
  // PERIOD CHANGE
  // =====================================================

  const handlePeriodChange = (
    event,
    newPeriod
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  // =====================================================
  // PDF EXPORT
  // =====================================================

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);

      doc.text(
        "Retail Billing - Sales Report",
        14,
        20
      );

      doc.setFontSize(10);

      doc.text(
        `Generated on: ${new Date().toLocaleDateString(
          "en-IN"
        )}`,
        14,
        28
      );

      doc.setFontSize(12);

      doc.text(
        `Total Sales: ₹${dashboard.totalSales}`,
        14,
        40
      );

      doc.text(
        `Total Bills: ${dashboard.totalBills}`,
        14,
        48
      );

      doc.text(
        `Products Sold: ${productsSold}`,
        14,
        56
      );

      doc.text(
        `Customers: ${dashboard.totalCustomers}`,
        14,
        64
      );

      const tableData =
        filteredBills.map(
          (bill) => [
            `#${bill.id}`,
            bill.customer?.name ||
              "Walk-in Customer",
            `₹${bill.totalAmount}`,
            bill.billDate
              ? new Date(
                  bill.billDate
                ).toLocaleDateString(
                  "en-IN"
                )
              : "-",
          ]
        );

      autoTable(doc, {
        startY: 75,

        head: [
          [
            "Bill ID",
            "Customer",
            "Amount",
            "Date",
          ],
        ],

        body: tableData,

        theme: "grid",

        headStyles: {
          fontStyle: "bold",
        },

        styles: {
          fontSize: 10,
        },
      });

      doc.save(
        "Retail_Sales_Report.pdf"
      );
    } catch (error) {
      console.error(
        "PDF Export Error:",
        error
      );
    }
  };

  // =====================================================
  // EXCEL EXPORT
  // =====================================================

  const handleExportExcel = () => {
    try {
      const monthlyData = {};

      bills.forEach((bill) => {
        if (!bill.billDate) {
          return;
        }

        const date =
          new Date(bill.billDate);

        const year =
          date.getFullYear();

        const month =
          date.getMonth();

        const key = `${year}-${String(
          month + 1
        ).padStart(2, "0")}`;

        const monthName =
          date.toLocaleString(
            "en-IN",
            {
              month: "long",
              year: "numeric",
            }
          );

        if (!monthlyData[key]) {
          monthlyData[key] = {
            Month: monthName,
            "Total Bills": 0,
            "Total Sales": 0,
            "Products Sold": 0,
          };
        }

        monthlyData[key][
          "Total Bills"
        ] += 1;

        monthlyData[key][
          "Total Sales"
        ] +=
          Number(
            bill.totalAmount
          ) || 0;

        monthlyData[key][
          "Products Sold"
        ] +=
          (bill.items || []).reduce(
            (sum, item) =>
              sum +
              (Number(
                item.quantity
              ) || 0),
            0
          );
      });

      const monthlyRows =
        Object.keys(monthlyData)
          .sort()
          .map(
            (key) =>
              monthlyData[key]
          );

      const workbook =
        XLSX.utils.book_new();

      const monthlySheet =
        XLSX.utils.json_to_sheet(
          monthlyRows
        );

      XLSX.utils.book_append_sheet(
        workbook,
        monthlySheet,
        "Monthly Report"
      );

      const billsData =
        bills.map((bill) => ({
          "Bill ID": `#${bill.id}`,

          Customer:
            bill.customer?.name ||
            "Walk-in Customer",

          Amount:
            Number(
              bill.totalAmount
            ) || 0,

          Payment:
            bill.payment ||
            "Unknown",

          Date: bill.billDate
            ? new Date(
                bill.billDate
              ).toLocaleDateString(
                "en-IN"
              )
            : "-",
        }));

      const billsSheet =
        XLSX.utils.json_to_sheet(
          billsData
        );

      XLSX.utils.book_append_sheet(
        workbook,
        billsSheet,
        "All Bills"
      );

      XLSX.writeFile(
        workbook,
        "Retail_Monthly_Sales_Report.xlsx"
      );
    } catch (error) {
      console.error(
        "Excel Export Error:",
        error
      );
    }
  };

  // =====================================================
  // HEATMAP COLOR
  // =====================================================

  const getHeatmapColor = (
    sales
  ) => {
    if (sales === 0) {
      return "#F1F3F8";
    }

    const intensity =
      sales / maxHeatmapSales;

    return `rgba(79, 70, 229, ${
      0.12 +
      intensity * 0.88
    })`;
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },

        background: "#F5F7FB",

        minHeight: "100vh",
      }}
    >
      {/* =================================================
          PAGE TITLE
      ================================================= */}

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Analyze your business performance
        and generate reports.
      </Typography>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 5,
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <ReportCard
            title="Total Sales"
            value={`₹${dashboard.totalSales}`}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <ReportCard
            title="Total Bills"
            value={
              dashboard.totalBills
            }
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <ReportCard
            title="Products Sold"
            value={productsSold}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <ReportCard
            title="Customers"
            value={
              dashboard.totalCustomers
            }
          />
        </Grid>
      </Grid>

      {/* =================================================
          SALES TREND
      ================================================= */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
       <Box
  display="flex"
  justifyContent="space-between"
  alignItems="flex-start"
  mb={4}
  flexWrap="wrap"
  gap={3}
>
          <Box>
            <Typography
      variant="h6"
      fontWeight="bold"
      sx={{
        mb: 1,
        fontSize: "1.25rem",
      }}
    >
              📈 Sales Trend
            </Typography>

            <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        mb: 2.5,
      }}
    >
              Sales performance over
              time
            </Typography>
          </Box>

          <ToggleButtonGroup
    value={period}
    exclusive
    onChange={handlePeriodChange}
    size="small"
    sx={{
      mt: 0.5,
    }}
  >
            <ToggleButton
      value="7"
      sx={{
        px: 2,
        py: 1,
      }}
    >
      7 DAYS
    </ToggleButton>

              <ToggleButton
      value="30"
      sx={{
        px: 2,
        py: 1,
      }}
    >
      30 DAYS
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: 350,
            mt:2,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={salesTrendData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  "Sales",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* =================================================
          PAYMENT + HEATMAP
      ================================================= */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
          alignItems: "stretch",
        }}
      >
        {/* =================================================
            PAYMENT METHOD
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Paper
            elevation={2}
             sx={{
    p: 3,
    borderRadius: 4,
    height: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  }}
          >
            <Typography
                variant="h6"
    fontWeight="bold"
    sx={{
      mb: 0.5,
      whiteSpace: "nowrap",
      fontSize: "1.29rem",
    }}
  >
              💳 Payment Method Analysis
            </Typography>

             <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      mb: 1,
      whiteSpace: "nowrap",
    }}
  >
              Sales distribution by
              payment method
            </Typography>

            {paymentData.length ===
            0 ? (
              <Box
                sx={{
                  height: 330,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                  <Typography
      color="text.secondary"
      textAlign="center"
      py={8}
    >
                  No payment data
                  available
                </Typography>
              </Box>
            ) : (
              <Box
  sx={{
    width: "100%",
    height: 300,
  }}
>
  <ResponsiveContainer
    width="100%"
    height="100%"
  >
    <PieChart>

      <Pie
        data={paymentData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={65}
        outerRadius={105}
        paddingAngle={4}
        label
      >
        {paymentData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              PAYMENT_COLORS[entry.name] || "#334155"
            }
          />
        ))}
      </Pie>

      <Tooltip
        formatter={(value) =>
          `₹${Number(value).toLocaleString("en-IN")}`
        }
      />

    </PieChart>
  </ResponsiveContainer>
</Box>

            )}
            <Box
  sx={{
    mt: 1,
    px: 1,
    pb: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 2.5,
    rowGap: 1.5,
  }}
>
  {Object.entries(PAYMENT_COLORS).map(
    ([name, color]) => (
      <Box
        key={name}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        {/* Color Symbol */}
        <Box
          sx={{
            width: 20,
            height: 12,
            backgroundColor: color,
            borderRadius: 0.5,
          }}
        />

        {/* Name */}
        <Typography
          variant="body2"
          sx={{
            color: color,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
      </Box>
    )
  )}
</Box>
          </Paper>
        </Grid>

        {/* =================================================
            SALES HEATMAP
        ================================================= */}

        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              boxSizing: "border-box",
              minHeight: 470,
               overflow: "hidden",
            }}
          >
            <Typography
                variant="h6"
    fontWeight="bold"
    sx={{
      mb: 0.5,
      fontSize: "1.35rem",
      whiteSpace: "nowrap",
    }}
            >
              🔥 Sales Heatmap
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
            >
              Sales activity by day and
              time
            </Typography>

            {/* HEATMAP */}

            <Box
              sx={{
                width: "100%",
                overflowX:
                  "auto",
              }}
            >
              <Box
                sx={{
                  minWidth: 720,
                }}
              >
                {/* TIME HEADER */}

                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns:
                      "80px repeat(12, minmax(38px, 1fr))",

                    gap: 0.7,

                    mb: 1,
                  }}
                >
                  <Box />

                  {heatmapHours.map(
                    (hour) => (
                      <Typography
                        key={hour}
                        variant="caption"
                        textAlign="center"
                        fontWeight="bold"
                        sx={{
                          whiteSpace:
                            "nowrap",
                          fontSize:
                            "0.7rem",
                        }}
                      >
                        {formatHour(
                          hour
                        )}
                      </Typography>
                    )
                  )}
                </Box>

                {/* HEATMAP ROWS */}

                {heatmapDays.map(
                  (day) => (
                    <Box
                      key={day}
                      sx={{
                        display:
                          "grid",

                        gridTemplateColumns:
                          "80px repeat(12, minmax(38px, 1fr))",

                        gap: 0.7,

                        mb: 0.7,
                      }}
                    >
                      {/* DAY */}

                      <Typography
                        variant="body2"
                        fontWeight="500"
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {day}
                      </Typography>

                      {/* CELLS */}

                      {heatmapHours.map(
                        (hour) => {
                          const cell =
                            salesHeatmapData.find(
                              (
                                item
                              ) =>
                                item.day ===
                                  day &&
                                item.hour ===
                                  hour
                            );

                          const intensity =
                            cell.sales /
                            maxHeatmapSales;

                          return (
                            <Box
                              key={`${day}-${hour}`}
                              title={`${day} ${formatHour(
                                hour
                              )} — Sales: ₹${Number(
                                cell.sales
                              ).toLocaleString(
                                "en-IN"
                              )} — Bills: ${
                                cell.billsCount
                              }`}
                              sx={{
                                height: 38,

                                minWidth: 0,

                                borderRadius:
                                  1.5,

                                backgroundColor:
                                  getHeatmapColor(
                                    cell.sales
                                  ),

                                display:
                                  "flex",

                                alignItems:
                                  "center",

                                justifyContent:
                                  "center",

                                cursor:
                                  "pointer",

                                transition:
                                  "all 0.2s",

                                border:
                                  cell.sales >
                                  0
                                    ? "1px solid rgba(79,70,229,0.08)"
                                    : "none",

                                "&:hover":
                                  {
                                    transform:
                                      "scale(1.06)",

                                    boxShadow:
                                      "0 4px 10px rgba(0,0,0,0.15)",

                                    zIndex: 2,
                                  },
                              }}
                            >
                              {/* SHOW SALES INSIDE CELL */}

                              {cell.sales >
                                0 && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight:
                                      "bold",

                                    fontSize:
                                      "0.62rem",

                                    color:
                                      intensity >
                                      0.55
                                        ? "#fff"
                                        : "#1E293B",

                                    whiteSpace:
                                      "nowrap",
                                  }}
                                >
                                  ₹
                                  {Number(
                                    cell.sales
                                  ).toLocaleString(
                                    "en-IN",
                                    {
                                      maximumFractionDigits: 0,
                                    }
                                  )}
                                </Typography>
                              )}
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  )
                )}

{/* ==========================
    HEATMAP LEGEND
========================== */}

<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    mt: 3,
    mb: 1,
  }}
>
  {/* LOW */}

  <Typography
    variant="caption"
    sx={{
      fontWeight: 600,
      color: "#555",
      mr: 0.5,
    }}
  >
    Low
  </Typography>

  {/* Color Scale */}

  <Box
    sx={{
      display: "flex",
      gap: 0.5,
      alignItems: "center",
    }}
  >

    {/* Very Low */}

    <Box
      sx={{
        width: 22,
        height: 18,
        borderRadius: 1,
        backgroundColor:
          "rgba(92,107,192,0.12)",
      }}
    />

    {/* Low */}

    <Box
      sx={{
        width: 22,
        height: 18,
        borderRadius: 1,
        backgroundColor:
          "rgba(92,107,192,0.30)",
      }}
    />

    {/* Medium */}

    <Box
      sx={{
        width: 22,
        height: 18,
        borderRadius: 1,
        backgroundColor:
          "rgba(92,107,192,0.50)",
      }}
    />

    {/* High */}

    <Box
      sx={{
        width: 22,
        height: 18,
        borderRadius: 1,
        backgroundColor:
          "rgba(92,107,192,0.75)",
      }}
    />

    {/* Very High */}

    <Box
      sx={{
        width: 22,
        height: 18,
        borderRadius: 1,
        backgroundColor:
          "rgba(63,81,181,1)",
      }}
    />

  </Box>

  {/* HIGH */}

  <Typography
    variant="caption"
    sx={{
      fontWeight: 600,
      color: "#555",
      ml: 0.5,
    }}
  >
    High
  </Typography>
</Box>              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* =================================================
          PEAK SALES INSIGHTS
      ================================================= */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
        {/* HEADER */}

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
        >
          📈 Peak Sales Insights
        </Typography>

        <Grid
          container
          spacing={3}
        >
          {/* =================================================
              PEAK TIME
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 2,

                borderRight: {
                  xs: "none",
                  md: "1px solid #E2E8F0",
                },

                pr: {
                  xs: 0,
                  md: 3,
                },

                minHeight: 90,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",

                  background:
                    "#E0F2FE",

                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",

                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                🕐
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Peak Time
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {peakTime}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Highest sales time
                  of the day
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* =================================================
              PEAK DAY
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 2,

                borderRight: {
                  xs: "none",
                  md: "1px solid #E2E8F0",
                },

                pr: {
                  xs: 0,
                  md: 3,
                },

                minHeight: 90,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",

                  background:
                    "#F3E8FF",

                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",

                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                📅
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Peak Day
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {peakDay.day}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Busiest day of the
                  week
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* =================================================
              MAX SALES
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 2,

                minHeight: 90,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",

                  background:
                    "#DCFCE7",

                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",

                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                📈
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Max Sales (Hour)
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  ₹
                  {Number(
                    peakHourData.sales
                  ).toLocaleString(
                    "en-IN"
                  )}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {peakHourData.sales >
                  0
                    ? `On ${peakHourData.day}, ${peakTime}`
                    : "No sales data"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* =================================================
          EXPORT REPORTS
      ================================================= */}

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={1}
        >
          📥 Export Reports
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          Download your sales data
          for further analysis or
          record keeping.
        </Typography>

        <Box
  display="flex"
  flexWrap="wrap"
  sx={{
    mt: 2,
  }}
>
  {/* PDF */}
  <Button
    variant="contained"
    color="error"
    onClick={handleExportPDF}
    sx={{
      px: 3,
      py: 1.2,
      borderRadius: 2,
      fontWeight: "bold",
    }}
  >
    📄 Export {period === "7" ? "7 Days" : "30 Days"} PDF
  </Button>

  {/* Excel */}
  <Button
    variant="contained"
    color="success"
    onClick={handleExportExcel}
    sx={{
      px: 3,
      py: 1.2,
      borderRadius: 2,
      fontWeight: "bold",

      // 👇 PDF aur Excel ke beech direct gap
      ml: 3,
    }}
  >
    📊 Export Monthly Excel
  </Button>
</Box>
      </Paper>
    </Box>
  );
}

export default Reports;