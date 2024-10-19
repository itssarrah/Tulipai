import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import { Button, TextField, MenuItem } from "@mui/material";

const InflowForm = ({ onSubmit }) => {
  const [inflow, setInflow] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/inflow-categories"
        );
        setCategories(response.data); // Set categories from API response
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories."); // Optionally, you can add an error toast
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setInflow({ ...inflow, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage
    try {
      const response = await axios.post(
        "http://localhost:8000/api/inflow",
        inflow,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      onSubmit(inflow); // Notify parent component
      setInflow({
        name: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
      toast.success("Inflow added successfully!"); // Add this line
    } catch (error) {
      console.error("Error adding inflow:", error);
      toast.error("Failed to add inflow."); // Optionally, you can add an error toast
    }
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
          <MenuItem value="">Select Category</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
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
