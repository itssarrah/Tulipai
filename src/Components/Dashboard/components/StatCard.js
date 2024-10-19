import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StatCard({ title, value, trend }) {
  const theme = useTheme();

  const trendColors = {
    up:
      theme.palette.mode === 'light'
        ? theme.palette.success.main
        : theme.palette.success.dark,
    down:
      theme.palette.mode === 'light'
        ? theme.palette.error.main
        : theme.palette.error.dark,
    neutral:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  };

  const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };
  const color = labelColors[trend];

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', flexGrow: 1, borderRadius: '50px' }} 
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Title */}
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          sx={{ color: theme.palette.grey[400], fontWeight: 'light' ,fontSize:"22px"}} // Larger title and grey
        >
          {title}
        </Typography>

        {/* Number */}
        <Typography
          variant="h2"
          component="p"
          sx={{ fontWeight: 'bold' }} 
        >
          {value}
        </Typography>

        {/* Percentage Trend at the bottom */}
        <Stack
          direction="row"
          sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Chip size="small" color={color} label={trendValues[trend]} />
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  interval: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
  value: PropTypes.string.isRequired,
};

export default StatCard;
