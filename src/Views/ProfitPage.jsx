import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import ProfitForm from "../Components/Profits/ProfitForm.jsx";
import ProfitList from "../Components/Profits/ProfitList.jsx";

const ProfitPage = () => {
  const [profits, setProfits] = useState([]);

  const fetchProfits = async () => {
    try {
      const response = await axios.get("/api/profits");
      setProfits(response.data);
    } catch (error) {
      console.error("Error fetching profits:", error);
    }
  };

  useEffect(() => {
    fetchProfits();
  }, []);

  const handleAddProfit = async (profit) => {
    try {
      const response = await axios.post("/api/profits", profit);
      setProfits([...profits, response.data]);
    } catch (error) {
      console.error("Error adding profit:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center my-6 text-gray-800">Profit Tracker</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Profit</h3>
          <ProfitForm onSubmit={handleAddProfit} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ProfitList profits={profits} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfitPage;