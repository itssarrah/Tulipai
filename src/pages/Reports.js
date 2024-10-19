import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import ReportCard from "../Components/Dashboard/components/ReportCard"; // Import the ReportCard component

export default function ReportsPage() {
  // States for Income/Outcome Report
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileFormat, setFileFormat] = useState("PDF");
  const [reportType, setReportType] = useState("Income"); // New state to handle the choice between Income or Outcome

  // States for Income Statement
  const [incomeReportMonth, setIncomeReportMonth] = useState("");
  const [incomeReportFormat, setIncomeReportFormat] = useState("PDF");

  // Toggle states for the cards
  const [openIncomeOutcome, setOpenIncomeOutcome] = useState(true);
  const [openIncomeReport, setOpenIncomeReport] = useState(true);

  // Handle downloading the income/outcome report (communicates with /reports/generate)
  const handleDownload = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('Authentication token is missing. Please log in.');
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reportType: `${reportType} report`, // Send Income or Outcome report based on selection
          startDate,
          endDate,
          fileFormat,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to download report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${reportType.toLowerCase()}_report_${startDate}_to_${endDate}.${fileFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  // Handle downloading the income statement (communicates with /generate-income-statement)
  const handleDownloadIncomeReport = async () => {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      alert('Authentication token is missing. Please log in.');
      return;
    }
  
    if (!incomeReportMonth) {
      alert("Please select a month.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/generate-income-statement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          month: incomeReportMonth, // Send the month directly in YYYY-MM format
          fileFormat: incomeReportFormat, // Send file format, either PDF or Excel
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to download report');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `income_statement_${incomeReportMonth}.${incomeReportFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };
  

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Download Reports
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Generate Income/Outcome Reports Card */}
          <ReportCard
            title="Generate Income/Outcome Reports"
            isOpen={openIncomeOutcome}
            onToggle={() => setOpenIncomeOutcome(!openIncomeOutcome)}
          >
             {/* Select Date Range */}
             <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Select Date Range
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
            {/* Choose Income or Outcome */}
            <Typography variant="h6" gutterBottom>
              Select Report Type
            </Typography>
            <RadioGroup
              row
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <FormControlLabel value="Income" control={<Radio />} label="Income" />
              <FormControlLabel value="Outcome" control={<Radio />} label="Outcome" />
            </RadioGroup>

           

            {/* Select File Format */}
            <Typography variant="h6" gutterBottom>
              Select File Format
            </Typography>
            <RadioGroup
              row
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
            >
              <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
              <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
              <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleDownload}
            >
              Download {reportType} Report
            </Button>
          </ReportCard>

          {/* Generate Income Statement Card */}
          <ReportCard
            title="Generate Income Statement"
            isOpen={openIncomeReport}
            onToggle={() => setOpenIncomeReport(!openIncomeReport)}
          >
            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
              This section is dedicated to generating income statements.
            </Typography>
            
            <Typography variant="h6" gutterBottom>
              Choose Month
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                type="month"
                label="Select Month"
                value={incomeReportMonth}
                onChange={(e) => setIncomeReportMonth(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>

            <Typography variant="h6" gutterBottom>
              Select File Format
            </Typography>
            <RadioGroup
              row
              value={incomeReportFormat}
              onChange={(e) => setIncomeReportFormat(e.target.value)}
            >
              <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
              <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleDownloadIncomeReport}
            >
              Download Income Statement
            </Button>
          </ReportCard>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
