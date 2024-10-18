import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import getSignUpTheme from "./Components/SignUp/getSignUpTheme.tsx"; // Import the theme function
import NavBar from "./Components/NavBar"; // Import the NavBar component
import LandingPage from "./Views/LandingPage"; // Import your LandingPage component
import SignUp from "./Components/SignUp/SignUp.tsx";

import Dashboard from "./Components/Dashboard/Dashboard.tsx";

function App() {
  const theme = getSignUpTheme("light"); // Set the desired theme mode here (light or dark)

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
