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
      const response = await axios.get("/api/expenses"); // Replace with your API route
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on load
  }, []);

  const handleAddExpense = async (expense) => {
    try {
      const response = await axios.post("/api/expenses", expense); // Replace with your API route
      setExpenses([...expenses, response.data]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center my-4">Expense Tracker</h2>
        <ExpenseForm onSubmit={handleAddExpense} />
        <ExpenseList expenses={expenses} />
      </div>
    </DashboardLayout>
  );
};

export default ExpensePage;
