import * as React from "react";
import { useState } from "react";
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
  const [step, setStep] = React.useState(0);
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [orgDetails, setOrgDetails] = React.useState({
    orgName: "",
    category: "",
    description: "",
  });
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

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

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgDetails({ ...orgDetails, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 0) {
      // Validate user details only on the first step
      if (validateInputs()) {
        setStep(1); // Move to the next step if valid
      }
    } else if (step === 1) {
      // Final submission logic here
      console.log("Final Submission: ", { userDetails, orgDetails });
    }
  };

  return (
    <>
      <NavBar />
      <ThemeProvider theme={createTheme({ palette: { mode } })}>
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
                      placeholder="••••••"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      variant="outlined"
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
                      id="orgName"
                      name="orgName"
                      placeholder="Your Organization Name"
                      onChange={handleOrgChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="category"
                      name="category"
                      placeholder="Business Category"
                      onChange={handleOrgChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      name="description"
                      placeholder="Brief description of your organization"
                      onChange={handleOrgChange}
                    />
                  </FormControl>
                </>
              )}
              <Stack direction="row" justifyContent="space-between">
                <Button
                  type="button"
                  onClick={() => setStep(step > 0 ? step - 1 : 0)}
                >
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  {step === 1 ? "Submit" : "Next"}
                </Button>
              </Stack>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Already have an account?{" "}
                <Link href="#" variant="subtitle2">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </>
  );
}
