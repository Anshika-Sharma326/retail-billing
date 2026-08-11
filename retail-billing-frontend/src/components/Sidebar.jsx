import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";

function Sidebar() {

  const location = useLocation();

  const role = localStorage.getItem("role");

  const adminMenu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/"
    },
    {
      text: "Products",
      icon: <InventoryIcon />,
      path: "/products"
    },
    {
      text: "Customers",
      icon: <PeopleIcon />,
      path: "/customers"
    },
    {
      text: "Billing",
      icon: <ReceiptIcon />,
      path: "/billing"
    },
    {
      text: "Reports",
      icon: <AssessmentIcon />,
      path: "/reports"
    },
    {
      text: "Employees",
      icon: <GroupIcon />,
      path: "/employees"
    },
     ];

  
  const staffMenu = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/"
    },
    {
      text: "Customers",
      icon: <PeopleIcon />,
      path: "/customers"
    },
    {
      text: "Billing",
      icon: <ReceiptIcon />,
      path: "/billing"
    }
  ];

  let menuItems = [];

  switch (role) {
    case "ADMIN":
      menuItems = adminMenu;
      break;

   

    case "STAFF":
      menuItems = staffMenu;
      break;

    default:
      menuItems = [];
  }

  return (
    <Box
  className="sidebar"
  sx={{
    width: 260,
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "#1E293B",
    color: "white",
    p: 3,
    overflowY: "auto",
    overflowX: "hidden",
    zIndex: 1200
  }}
>
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{
          textAlign: "center",
          mb: 4
        }}
      >
        Retail POS
      </Typography>

      <List>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "white"
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  background:
                    location.pathname === item.path
                      ? "#334155"
                      : "transparent",

                  "&:hover": {
                    background: "#334155"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;