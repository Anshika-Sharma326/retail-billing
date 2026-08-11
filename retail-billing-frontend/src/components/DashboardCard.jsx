import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

function DashboardCard({
  title,
  value,
  color,
  icon
}) {
  return (
    <Card
      sx={{
        width: "100%",
        height: 150,
        borderRadius: 4,
        color: "#fff",
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.22)"
        }
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2
        }}
      >
        <Box
           style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "30%",
              background: "rgba(255,255,255,0.20)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1
            }}
          >
            {icon}
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontWeight: 600,
              textAlign: "center"
            }}
          >
            {title}
          </Typography>

          {/* Value */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mt: 0.5
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;