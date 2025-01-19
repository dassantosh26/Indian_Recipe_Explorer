/** @format */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { loginUser } from "../api/userApi"; 
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password }); 
      setError("");
      login(response.data.token, response.data.username); 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom className="flex items-center justify-center">
          <img src="/logo.png" alt="" />
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            autoComplete="email"
            required
          />
          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            autoComplete="current-password"
            required
          />
          {/* Error Message */}
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <button
            type="submit"
            className="w-full p-3 my-3 text-white transition duration-300 ease-in-out rounded-lg bg-custom-header-color hover:opacity-80"
          >
            Login
          </button>
          <Typography align="center">
            Don't have an account?
            <button
              component={Link}
              to="/signup"
              className="text-custom-header-color"
            >
              Sign up
            </button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;