import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box className="sidebar">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          ml: "260px",
          width: "calc(100% - 260px)",
          minHeight: "100vh",
          bgcolor: "#F5F7FB",
        }}
      >
        {/* Navbar */}
        <Box className="navbar">
          <Navbar />
        </Box>

        {/* Page Content */}
       <Box
  sx={{
    pt: "92px",   // Navbar ki height (72px) + 20px gap
    px: 3,
    pb: 3,
  }}
>
  {children}
</Box>
      </Box>
    </Box>
  );
}

export default Layout;