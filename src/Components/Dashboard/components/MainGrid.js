import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

const data = [
  {
    title: 'Working Capital',
    value: '14k',
    trend: 'up',
  },
  {
    title: 'Leverage',
    value: '325',
    trend: 'down',
  },
  {
    title: 'Quick Ratio',
    value: '200k',
    trend: 'neutral',
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Overview Section */}
      <Typography component="h1" variant="h6" sx={{ mb: 2, fontSize: '30px' }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
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
      <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: '30px' }}>
        Cash Flow
      </Typography>
      <Grid container spacing={2} columns={2}>
        <Grid size={{ md: 1, lg: 1 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ md: 1, lg: 1 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: '30px' }}>
        Profit
      </Typography>
      <Grid container spacing={20} columns={2}>
        <Grid size={{ md: 1, lg: 1 }}>
          <SessionsChart />
        </Grid>
        <Grid container spacing={20} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <HighlightedCard />
        <HighlightedCard />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2, fontSize: '30px' }}>
        Expenses
      </Typography>
        <Grid container spacing={2} columns={2}>
        <Grid size={{ md: 1, lg: 1 }}>
           <ChartUserByCountry />
        </Grid>
        <Grid size={{ md: 1, lg: 1 }}>
        <SessionsChart />
        </Grid>
      </Grid>
     
    </Box>
  );
}
