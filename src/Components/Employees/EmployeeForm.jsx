import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import DashboardLayout from "../Dashboard/DashboardLayout.tsx";

import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const EmployeeForm = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch roles from the backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/roles");
        const data = await response.json();
        setRoles(data); // Assuming the response is an array of roles
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  // Handle invite employee
  const handleInviteEmployee = async () => {
    if (!validateEmail(email)) {
      setSnackbarMessage("Invalid email format!");
      setOpenSnackbar(true);
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      console.log(role);
      const response = await fetch(
        "http://localhost:8000/api/invite-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ email, role }), // Include the email and role in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to invite employee");
      }

      setSnackbarMessage("Employee invited successfully!");
      setOpenSnackbar(true);

      // Redirect to /manager_employees after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error inviting employee:", error);
      setSnackbarMessage("Failed to invite employee. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 2, width: "50vw", margin: "0 auto" }}>
        {" "}
        {/* Set the width to 50vw and center the form */}
        <Typography variant="h5" gutterBottom>
          Invite Employee
        </Typography>
        <h6 className="text-md text-gray-400">
          (must be hosted to work currently works only with 1 email using
          mailtrap/ or use log mail provider locally)
        </h6>
        <Stack spacing={2}>
          <TextField
            label="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem key={role.role_name} value={role.role_name}>
                  {role.role_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInviteEmployee}
            fullWidth
          >
            Invite Employee
          </Button>
        </Stack>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
          autoHideDuration={3000} // Auto-hide duration
        />
      </Box>
      <div>
        {roles.map((role) => (
          <div key={role.role_name}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ReportGmailerrorredIcon sx={{ marginRight: 1 }} />
              {role.role_name}:
            </Typography>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeForm;
