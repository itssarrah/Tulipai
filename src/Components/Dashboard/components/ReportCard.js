import React from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ReportCard({ title, isOpen, onToggle, children }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">{title}</Typography>
          <IconButton onClick={onToggle}>
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            {children}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
