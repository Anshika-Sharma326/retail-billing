import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "STAFF",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 400,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          mb={2}
        >
          Register
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={data.role}
          onChange={handleChange}
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          
          <MenuItem value="STAFF">STAFF</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;