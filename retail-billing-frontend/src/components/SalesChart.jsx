import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function SalesChart({ bills }) {

  const monthlySales = {};

  bills.forEach((bill) => {

    if (!bill.billDate) return;

    const month = new Date(bill.billDate).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlySales[month]) {
      monthlySales[month] = 0;
    }

    monthlySales[month] += Number(
      bill.totalAmount || 0
    );

  });

  const data = Object.keys(monthlySales).map((month) => ({
    month,
    sales: monthlySales[month]
  }));

  return (

    <ResponsiveContainer
      width="100%"
      height= "94%"
       
    >

      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="sales"
          radius={[10,10,0,0]}
          fill="#1976d2"
        />

      </BarChart>

    </ResponsiveContainer>

  );

}

export default SalesChart;