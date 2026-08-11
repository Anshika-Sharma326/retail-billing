import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Stack,
  Avatar
} from "@mui/material";

function TopProducts({ bills }) {

  const productSales = {};

  bills.forEach((bill) => {

    if (!bill.items) return;

    bill.items.forEach((item) => {

      const name = item.product?.productName;

      if (!name) return;

      productSales[name] =
        (productSales[name] || 0) + item.quantity;

    });

  });

  const data = Object.keys(productSales)
    .map((name) => ({
      name,
      quantity: productSales[name]
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const max =
    data.length > 0 ? data[0].quantity : 1;

  return (

    <Stack spacing={3}>

      {

        data.map((item, index) => (

          <Box key={index}>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >

              <Box
                display="flex"
                alignItems="center"
                gap={2}
              >

                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                    width: 34,
                    height: 34
                  }}
                >
                  {index + 1}
                </Avatar>

                <Typography fontWeight="600">
                  {item.name}
                </Typography>

              </Box>

              <Typography
                fontWeight="bold"
                color="primary"
              >
                {item.quantity}
              </Typography>

            </Box>

            <LinearProgress
              variant="determinate"
              value={(item.quantity / max) * 100}
              sx={{
                height: 8,
                borderRadius: 10
              }}
            />

          </Box>

        ))

      }

    </Stack>

  );

}

export default TopProducts;