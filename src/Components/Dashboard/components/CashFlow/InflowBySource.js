import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function InflowBySourceChart() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchInflowsByCategories = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/inflow-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { date }, // Add any query params if needed
        }
      );
      const data = await response.json();
      setChartData(data);

      console.log(data);
    };

    fetchInflowsByCategories();
  }, []);

  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
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
