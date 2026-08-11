import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const result = await login(
      data.username,
      data.password
    );

    if (result) {
       // Dashboard par redirect
      navigate("/");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: 350,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Login
        </Typography>

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

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography align="center" sx={{ mt: 2 }}>
  Don't have an account?{" "}
  <Link to="/register">
    Register
  </Link>
</Typography>
      </Paper>
    </Box>
  );
}

export default Login;