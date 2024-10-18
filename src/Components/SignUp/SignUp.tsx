import * as React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from "@mui/material/styles";
import NavBar from "../NavBar";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
}));

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<PaletteMode>("light");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [orgDetails, setOrgDetails] = useState({
    orgName: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState([]); // State for categories
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Assuming the API returns an array of categories
        } else {
          console.error("Error fetching categories");
        }
      } catch (error) {
        console.error("Network error: ", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once on mount

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    if (name === "email") {
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  };

  const handleOrgChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      // Store the category ID directly
      setOrgDetails({ ...orgDetails, [name]: value }); // value is the category ID
    } else {
      setOrgDetails({ ...orgDetails, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 0) {
      if (validateInputs()) {
        setStep(1);
      }
    } else if (step === 1) {
      const submissionData = {
        user: userDetails,
        organization: orgDetails,
      };

      try {
        const response = await fetch("http://localhost:8000/api/managers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (response.ok) {
          toast.success("Sign up successful!", { autoClose: 3000 }); // Show success toast
          setTimeout(() => {
            navigate("/login"); // Navigate to login page after 3 seconds
          }, 3000);
        } else {
          // Handle error (e.g., show an error toast)
          toast.error("Sign up failed. Please try again.");
        }
      } catch (error) {
        console.error("Network error: ", error);
        toast.error("An error occurred. Please try again."); // Handle network error
      }
    }
  };

  return (
    <>
      <NavBar />

      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img src="/logo.png" alt="logo" className="w-[5vw]" />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {step === 0 ? "Sign up" : "Organization Details"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {step === 0 && (
              <>
                <FormControl>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Sarra Arab"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                    onChange={handleUserChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={emailError ? "error" : "primary"}
                    onChange={handleUserChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="********"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? "error" : "primary"}
                    onChange={handleUserChange}
                  />
                </FormControl>
              </>
            )}
            {step === 1 && (
              <>
                <FormControl>
                  <FormLabel htmlFor="orgName">Organization Name</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="orgName"
                    id="orgName"
                    placeholder="Organization Name"
                    onChange={handleOrgChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <div style={{ position: "relative", width: "100%" }}>
                    <select
                      name="category"
                      id="category"
                      required
                      onChange={handleOrgChange}
                      style={{
                        width: "100%",
                        height: "56px",
                        border: "1px solid #1976d2",
                        borderRadius: "4px",
                        padding: "10px",
                        fontSize: "16px",
                        outline: "none",
                        backgroundColor: "#fff",
                        appearance: "none",
                        paddingRight: "30px",
                      }}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {/* Chevron Icon */}
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px", // Position the chevron icon
                        transform: "translateY(-50%)", // Center the chevron vertically
                        pointerEvents: "none", // Prevent pointer events on the chevron
                        color: "#1976d2", // Chevron color
                      }}
                    >
                      &#9662; {/* Unicode for down chevron */}
                    </span>
                  </div>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="description"
                    id="description"
                    placeholder="Organization Description"
                    multiline
                    rows={4}
                    onChange={handleOrgChange}
                  />
                </FormControl>
              </>
            )}
            <Button type="submit" variant="contained">
              {step === 0 ? "Next" : "Submit"}
            </Button>
            <Link href="/login" variant="body2" alignSelf="flex-end">
              Already have an account? Log in
            </Link>
          </Box>
        </Card>
      </SignUpContainer>
      <ToastContainer />
    </>
  );
}
