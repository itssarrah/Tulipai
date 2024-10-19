// src/pages/Reports.js
import React, { useState } from "react";
import { Box, Typography, Button, Stack, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx"; // Import your Dashboard Layout

export default function Reports() {
  // State for date range, file format, and report type
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileFormat, setFileFormat] = useState("PDF");
  const [reportType, setReportType] = useState("Income"); // Default to Income Report

  // Handle downloading the report
  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }
  
    console.log(`Downloading ${reportType} in ${fileFormat} format from ${startDate} to ${endDate}`);
  
    // Example fetch request for CSV/PDF/Excel download
    try {
      const response = await fetch('http://localhost:8000/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType,
          startDate,
          endDate,
          fileFormat,  // Include file format in the request
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to download report');
      }
  
      const blob = await response.blob();  // Convert response to Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${reportType}-${startDate}-to-${endDate}.${fileFormat.toLowerCase()}`;  // Dynamic filename based on format
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };
  

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, width: '100%' }}>
        {/* Heading */}
        <Typography variant="h4" gutterBottom>
          Download Reports
        </Typography>

        {/* Date Range Picker */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Date Range
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                console.log("Start Date:", e.target.value);  // Log start date
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Box>

        {/* File Format Picker */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select File Format
          </Typography>
          <RadioGroup
            row
            value={fileFormat}
            onChange={(event) => {
              setFileFormat(event.target.value);
              console.log("File Format:", event.target.value);  // Log file format
            }}
          >
            <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
            <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
            <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
          </RadioGroup>
        </Box>

        {/* Report Type Picker */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Select Report Type
          </Typography>
          <RadioGroup
            row
            value={reportType}
            onChange={(event) => setReportType(event.target.value)}
          >
            <FormControlLabel value="Income report" control={<Radio />} label="Income" />
            <FormControlLabel value="Expense report" control={<Radio />} label="Expense" />
          </RadioGroup>
        </Box>

        {/* Confirm and Download Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Confirm and Download
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
          >
            Download Report
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
