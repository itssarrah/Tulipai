import React, { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";

const InflowForm = ({ onSubmit }) => {
  const [inflow, setInflow] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setInflow({ ...inflow, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inflow);
    setInflow({
      name: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Name"
          name="name"
          value={inflow.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Category"
          name="category"
          value={inflow.category}
          onChange={handleChange}
          required
          fullWidth
          select
        >
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Investment">Investment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Amount"
          type="number"
          name="amount"
          value={inflow.amount}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Date"
          type="date"
          name="date"
          value={inflow.date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={inflow.description}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#72E0D4", color: "white" }}
          fullWidth
        >
          Add Inflow
        </Button>
      </div>
    </form>
  );
};

export default InflowForm;
