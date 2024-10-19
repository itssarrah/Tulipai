import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import InflowForm from "../Components/Inflow/InflowForm.jsx";
import InflowList from "../Components/Inflow/InflowList.jsx";

const InflowPage = () => {
  const [inflows, setInflows] = useState([]); // Initialize inflows as an array

  // Fetch inflows from the backend
  const fetchInflows = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    try {
      const response = await axios.get("http://localhost:8000/api/inflows", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log("Inflows response:", response.data); // Log response for debugging
      setInflows(response.data.inflows); // Ensure this is set correctly based on your API response
    } catch (error) {
      console.error("Error fetching inflows:", error);
      setInflows([]); // Reset to empty array on error
    }
  };

  useEffect(() => {
    fetchInflows(); // Fetch inflows on component mount
  }, []);

  // Function to handle form submission and update inflows state
  const handleSubmit = (newInflow) => {
    setInflows((prevInflows) => [...prevInflows, newInflow]); // Add new inflow to the existing list
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center my-4">Inflow Tracker</h2>
        <InflowForm onSubmit={handleSubmit} />{" "}
        {/* Pass handleSubmit to InflowForm */}
        <InflowList inflows={inflows} /> {/* Pass inflows to InflowList */}
      </div>
    </DashboardLayout>
  );
};

export default InflowPage;
