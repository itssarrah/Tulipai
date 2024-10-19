import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import ExpenseForm from "../Components/Expenses/ExpenseForm.jsx";
import ExpenseList from "../Components/Expenses/ExpensesList.jsx";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from the backend
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const response = await axios.get(
        "http://127.0.0.1:8000/api/getOutflows",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the headers
          },
        }
      );
      console.log(response.data);
      setExpenses(response.data.outflows); // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on load
  }, []);

  // Function to handle form submission and update expenses state
  const handleSubmit = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Add new expense to the existing list
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center my-4">Expense Tracker</h2>
        <ExpenseForm onSubmit={handleSubmit} />{" "}
        {/* Pass handleSubmit to ExpenseForm */}
        <ExpenseList expenses={expenses} />
      </div>
    </DashboardLayout>
  );
};

export default ExpensePage;
