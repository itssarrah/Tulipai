import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Views/LandingPage"; // Import your LandingPage component
import SignUp from "./Components/SignUp/SignUp.tsx";

import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import SignIn from "./Components/LogIn/SignIn.tsx";
import { CssBaseline } from "@mui/material";
import AppTheme from "./Components/shared-theme/AppTheme.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

function App() {
  return (
    <Router>
      <AppTheme>
        <CssBaseline /> {/* Ensure global CSS reset is applied */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppTheme>
      <ToastContainer />
    </Router>
  );
}

export default App;
