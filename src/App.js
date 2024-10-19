import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./Views/LandingPage"; // Import your LandingPage component
import SignUp from "./Components/SignUp/SignUp.tsx";

import Dashboard from "./Views/Dashboard.tsx";
import SignIn from "./Components/LogIn/SignIn.tsx";
import { CssBaseline } from "@mui/material";
import AppTheme from "./Components/shared-theme/AppTheme.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

import EmployeeForm from "./Components/Employees/EmployeeForm.jsx";
import SignupEmployee from "./Components/Employees/SignupEmployee.jsx";
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
          <Route path="/add-employees" element={<EmployeeForm />} />
          <Route path="/employee_signup/:token" element={<SignupEmployee />} />
        </Routes>
      </AppTheme>
      <ToastContainer />
    </Router>
  );
}

export default App;
