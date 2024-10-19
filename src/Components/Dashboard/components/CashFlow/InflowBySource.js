import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InflowBySourceChart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchInflowsByCategories = async () => {
      const token = localStorage.getItem("token"); // Retrieve token inside useEffect

      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/inflow-category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChartData(response.data); // Axios directly provides JSON data

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching inflows data", error);
      }
    };

    fetchInflowsByCategories();
  }, []); // Empty dependency array means this effect runs once, when the component mounts.

  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    "#FF6B6B", // Red
    "#6BFFB8", // Green
    "#FFD93D", // Yellow
    "#8B5CF6", // Purple
    "#FF9F1C", // Orange
    "#4ADE80", // Light Green
    "#F472B6", // Pink
    "#36CFC9", // Teal
    "#A0AEC0", // Gray
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Inflow Categories (Last 6 Months)
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: [
                "Current Month",
                "Month 1",
                "Month 2",
                "Month 3",
                "Month 4",
                "Month 5",
                "Month 6",
              ],
            },
          ]}
          series={chartData} // Use the aggregated data from the backend
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
        />
      </CardContent>
    </Card>
  );
}
