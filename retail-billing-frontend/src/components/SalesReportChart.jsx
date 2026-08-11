import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SalesReportChart({ bills }) {

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlySales = Array(12).fill(0);

  bills.forEach((bill) => {
    const month = new Date(bill.billDate).getMonth();
    monthlySales[month] += bill.totalAmount;
  });

  const data = monthNames.map((month, index) => ({
    month,
    sales: monthlySales[index],
  }));

  // Maximum sales
  const maxSales = Math.max(...monthlySales);

  // Y-axis ka interval
  const step = maxSales === 0
    ? 100
    : Math.ceil(maxSales / 5 / 100) * 100;

  // Y-axis maximum
  const yMax = step * 5;

  // Y-axis values
  const yTicks = Array.from(
    { length: 6 },
    (_, index) => index * step
  );

  return (
    <div
  style={{
    width: "100%",
    height: 500,       // 👈 SAME
    marginTop: 40,
  }}
>
  <ResponsiveContainer width="100%" height="100%">
   <LineChart
  data={data}
  margin={{
    top: 10,
    right: 20,
    left: 10,
    }}
>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month"  />

      <YAxis
        domain={[0, "dataMax"]}
        tickCount={10}
      />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="sales"
        stroke="#1976d2"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
  );
}

export default SalesReportChart;