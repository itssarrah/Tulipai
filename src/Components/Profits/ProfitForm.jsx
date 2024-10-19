import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const ProfitForm = ({ onSubmit }) => {
  const [profit, setProfit] = useState({
    date: "",
    revenue: "",
    cogs: "",
    operating_expenses: "",
  });

  const handleChange = (e) => {
    setProfit({ ...profit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profit);
    setProfit({
      date: "",
      revenue: "",
      cogs: "",
      operating_expenses: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Date"
          type="date"
          name="date"
          value={profit.date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Revenue"
          type="number"
          name="revenue"
          value={profit.revenue}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="COGS"
          type="number"
          name="cogs"
          value={profit.cogs}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Operating Expenses"
          type="number"
          name="operating_expenses"
          value={profit.operating_expenses}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary" // Use the primary color from the theme
          fullWidth
        >
          Add Profit
        </Button>
      </div>
    </form>
  );
};

export default ProfitForm;
