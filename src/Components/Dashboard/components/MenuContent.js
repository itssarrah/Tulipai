import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon /> },
  { text: 'Expenses', icon: <AnalyticsRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem 
            key={index} 
            disablePadding 
            sx={{ 
              display: 'block', 
              mt: index === 1 ? 2 : 0
            }}
          >
            <ListItemButton selected={index === 0}>
              <ListItemIcon sx={{ fontSize: '20px !important' }}> {}
                {React.cloneElement(item.icon, { fontSize: 'inherit' })} {}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  sx: { 
                    color: '#ffffff',  
                    fontSize: '20px !important',  
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
