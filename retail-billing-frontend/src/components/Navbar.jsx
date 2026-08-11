import React, { useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fullName = localStorage.getItem("fullName") || "Admin";
  const role = localStorage.getItem("role") || "ADMIN";

  const firstLetter = fullName.charAt(0).toUpperCase();

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const pageName = {
    "/": "Dashboard",
    "/products": "Products",
    "/customers": "Customers",
    "/billing": "Billing",
    "/reports": "Reports",
    "/employees": "Employees",
    };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
  if (role !== "ADMIN") return;

  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 5000); // Every 5 seconds

  return () => clearInterval(interval);

}, [role]);
  const loadNotifications = async () => {
    try {
      const response = await api.get("/admin/pending");
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 const approveUser = async (id) => {

    try{

        await api.put(`/admin/approve/${id}`);

        alert("Employee Approved Successfully");

        loadNotifications();

    }catch(error){

        console.log(error);

    }

};

  const rejectUser = async (id) => {
    try {
      await api.put(`/admin/reject/${id}`);
      alert("Employee Rejected Successfully");
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "260px",
          width: "calc(100% - 260px)",
          height: "72px",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          zIndex: 1100,
        }}
      >
        {/* Left */}
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1E293B",
          }}
        >
          {pageName[location.pathname] || "Dashboard"}
        </Typography>

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Date */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#64748B",
            }}
          >
            <CalendarMonthOutlinedIcon fontSize="small" />
            <Typography fontSize={15}>{today}</Typography>
          </Box>

          {/* Notification */}
          {role === "ADMIN" && (
            <IconButton onClick={handleNotificationClick}>
              <Badge
                badgeContent={notifications.length}
                color="error"
              >
                <NotificationsNoneOutlinedIcon
                  sx={{ color: "#334155" }}
                />
              </Badge>
            </IconButton>
          )}

          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#2563EB",
                width: 40,
                height: 40,
              }}
            >
              {firstLetter}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#1E293B",
                  fontSize: 15,
                }}
              >
                {fullName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#64748B",
                }}
              >
                {role}
              </Typography>
            </Box>
          </Box>

          {/* Logout */}
          <Button
            variant="contained"
            startIcon={<LogoutOutlinedIcon />}
            onClick={handleLogout}
            sx={{
              bgcolor: "#DC2626",
              "&:hover": {
                bgcolor: "#B91C1C",
              },
              borderRadius: "10px",
              textTransform: "none",
              px: 2.5,
              py: 1,
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Notification Popup */}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            width: 360,
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Pending Staff Requests
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {notifications.length === 0 ? (
            <Typography
              align="center"
              color="text.secondary"
            >
              No Pending Requests
            </Typography>
          ) : (
            <List>
              {notifications.map((user) => (
                <Box key={user.id}>
                  <ListItem
                    disableGutters
                    sx={{
                      display: "block",
                    }}
                  >
                   <ListItemText
    primary={user.fullName}
    secondary={`New Staff Registration • ${user.username}`}
/>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() =>
                          approveUser(user.id)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          rejectUser(user.id)
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  </ListItem>

                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </List>
          )}
        </Box>
      </Popover>
    </>
  );
}

export default Navbar;