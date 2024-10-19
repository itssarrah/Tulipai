import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import InflowForm from "../Components/Inflow/InflowForm.jsx";
import InflowList from "../Components/Inflow/InflowList.jsx";

const InflowPage = () => {
  const [inflows, setInflows] = useState([]);

  const fetchInflows = async () => {
    try {
      const response = await axios.get("/api/inflows");
      setInflows(response.data);
    } catch (error) {
      console.error("Error fetching inflows:", error);
    }
  };

  useEffect(() => {
    fetchInflows();
  }, []);

  const handleAddInflow = async (inflow) => {
    try {
      const response = await axios.post("/api/inflows", inflow);
      setInflows([...inflows, response.data]);
    } catch (error) {
      console.error("Error adding inflow:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center my-6 text-gray-800">Inflow Tracker</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Inflow</h3>
          <InflowForm onSubmit={handleAddInflow} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <InflowList inflows={inflows} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InflowPage;
