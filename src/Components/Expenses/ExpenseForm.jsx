import React, { useState } from "react";

const ExpenseForm = ({ onSubmit }) => {
  const [expense, setExpense] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense); // Send the new expense data to parent component
    setExpense({
      name: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      {/* Expense Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Expense Name
        </label>
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      
      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Supplies">Supplies</option>
        </select>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          value={expense.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        style={{ backgroundColor: '#72E0D4'}} 
        className="hover:bg-green-600 text-gray-800  font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
