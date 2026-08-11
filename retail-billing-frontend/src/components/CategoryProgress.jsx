import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack
} from "@mui/material";

function CategoryProgress({ bills }) {

  const categorySales = {};

  bills.forEach((bill) => {

    if (!bill.items) return;

    bill.items.forEach((item) => {

      const category = item.product?.category;

      if (!category) return;

      categorySales[category] =
        (categorySales[category] || 0) + item.totalPrice;

    });

  });

  const data = Object.keys(categorySales)
    .map((category) => ({
      category,
      value: categorySales[category]
    }))
    .sort((a, b) => b.value - a.value);

  const max =
    data.length > 0 ? data[0].value : 1;

  return (

    <Stack spacing={3}>

      {

        data.map((item, index) => (

          <Box key={index}>

            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >

              <Typography fontWeight="600">
                {item.category}
              </Typography>

              <Typography
                color="primary"
                fontWeight="bold"
              >
                ₹{item.value}
              </Typography>

            </Box>

            <LinearProgress
              variant="determinate"
              value={(item.value / max) * 100}
              sx={{
                height: 10,
                borderRadius: 5
              }}
            />

          </Box>

        ))

      }

    </Stack>

  );

}

export default CategoryProgress;