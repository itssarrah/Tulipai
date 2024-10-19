import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import NavBar from "../NavBar";

const SignupEmployee = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [companyInfo, setCompanyInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch company and manager info on component mount
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/company_info/${token}` // API endpoint to get company info
        );

        if (!response.ok) {
          throw new Error("Failed to fetch company information.");
        }

        const data = await response.json();
        setCompanyInfo(data);

        // Pre-fill form data with employee info
        setFormData({
          name: data.name,
          email: data.email,
          phone: "",
          password: "",
        });
      } catch (err) {
        setError(err.message || "Error fetching company information.");
      }
    };

    fetchCompanyInfo();
  }, [token]);

  // Validate fields
  const validateFields = () => {
    const errors = {};

    // Name validation
    if (!formData.name) {
      errors.name = "Name is required.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/; // Adjust regex based on expected phone format
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!phonePattern.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields before submission
    if (!validateFields()) {
      setLoading(false);
      return; // Stop submission if validation fails
    }

    console.log(formData);

    try {
      const response = await fetch(
        `http://localhost:8000/api/employee_signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete signup.");
      }

      const data = await response.json();
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Failed to complete signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update form data as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" }); // Clear error for the field being changed
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Employee Signup
          </Typography>

          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {companyInfo && (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Company Information</Typography>
              <Typography>Company Name: {companyInfo.companyName}</Typography>
              <Typography>Manager: {companyInfo.managerName}</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={Boolean(validationErrors.name)} // Set error state
              helperText={validationErrors.name} // Show error message
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              disabled
              error={Boolean(validationErrors.email)} // Set error state
              helperText={validationErrors.email} // Show error message
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={Boolean(validationErrors.phone)} // Set error state
              helperText={validationErrors.phone} // Show error message
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              error={Boolean(validationErrors.password)} // Set error state
              helperText={validationErrors.password} // Show error message
            />

            <Box sx={{ marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default SignupEmployee;
