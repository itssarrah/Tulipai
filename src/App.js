import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar"; // Import the NavBar component
import LandingPage from "./Views/LandingPage"; // Import your LandingPage component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
