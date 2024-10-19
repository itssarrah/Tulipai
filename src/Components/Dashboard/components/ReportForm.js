import React from 'react';
import { Box, Stack, TextField, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

export default function ReportForm({ startDate, endDate, setStartDate, setEndDate, fileFormat, setFileFormat, handleDownload }) {
  return (
    <Box>
      {/* Date Range Picker */}
      <Typography variant="h6" gutterBottom>
        Select Date Range
      </Typography>
      <Stack direction="row" spacing={2}>
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

      {/* File Format Picker */}
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Select File Format
        </Typography>
        <RadioGroup
          row
          value={fileFormat}
          onChange={(event) => setFileFormat(event.target.value)}
        >
          <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
          <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
          <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
        </RadioGroup>
      </Box>

      {/* Download Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownload}
      >
        Download Report
      </Button>
    </Box>
  );
}
