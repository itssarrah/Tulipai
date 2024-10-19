import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopUsers from "./Profit/BestCustomer";
import TopProducts from "./Profit/BestProduct";
import HighlightedCard from "./HighlightedCard";
import InflowBySourceChart from "./CashFlow/InflowBySource.js";
import InflowOutFlowLineChart from "./CashFlow/InflowOutflowLineChart";
import ProfitChart from "./Profit/profitlinechart";
import ExpenseRank from "./expenses/expensesrank";
import ExpenseLine from "./expenses/expenseslinechart";
import StatCard from "./StatCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

export default function MainGrid() {
  const [metrics, setMetrics] = useState({}); // Start with an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token
        const response = await axios.get(
          "http://localhost:8000/api/dashboard/metrics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if metrics is an object before setting it
        if (
          typeof response.data.metrics === "object" &&
          response.data.metrics !== null
        ) {
          setMetrics(response.data.metrics);
        } else {
          console.error(
            "Expected metrics to be an object",
            response.data.metrics
          );
          setMetrics({}); // Set to an empty object if it's not an object
        }

        console.log(response.data.metrics);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full height of the viewport
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error)
    return (
      <Typography color="error">
        Error fetching metrics: {error.message}
      </Typography>
    );

  // Map backend metrics to static structure
  const data = [
    {
      title: "Working Capital",
      value: metrics.working_capital + "$" || "N/A", // Use N/A as default
      trend: "up", // Static trend
    },
    {
      title: "Leverage",
      value: metrics.leverage + "%" || "N/A", // Use N/A as default
      trend: "down", // Static trend
    },
    {
      title: "Quick Ratio",
      value: metrics.quick_ratio || "N/A", // Use N/A as default
      trend: "neutral", // Static trend
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* Overview Section */}
      <Typography component="h1" variant="h6" sx={{ mb: 2, fontSize: "30px" }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
      </Grid>

      {/* Cash Flow Section */}
      <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: "30px" }}>
        Cash Flow
      </Typography>
      <Grid container spacing={2} columns={2}>
        <Grid size={{ md: 1, lg: 1 }}>
          <InflowOutFlowLineChart />
        </Grid>
        <Grid size={{ md: 1, lg: 1 }}>
          <InflowBySourceChart />
        </Grid>
      </Grid>

      {/* <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: "30px" }}> */}
      {/* Profit */}
      {/* </Typography> */}
      <Grid container spacing={20} columns={3}>
        {/* <Grid size={{ md: 1, lg: 1 }}><ProfitChart /></Grid> */}
        <Grid size={{ md: 1, lg: 1 }}>{/* <TopUsers /> */}</Grid>
        <Grid size={{ md: 1, lg: 1 }}>{/* <TopProducts /> */}</Grid>

        <Typography
          component="h2"
          variant="h6"
          sx={{ mb: 2, fontSize: "30px" }}
        ></Typography>
        <Grid container spacing={25} columns={3}></Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: "30px" }}>
        Expenses
      </Typography>
      <Grid container spacing={2} columns={2}>
        <Grid size={{ md: 1, lg: 1 }}>
          <ExpenseRank />
        </Grid>
        <Grid size={{ md: 1, lg: 1 }}>
          <ExpenseLine />
        </Grid>
      </Grid>
    </Box>
  );
}
