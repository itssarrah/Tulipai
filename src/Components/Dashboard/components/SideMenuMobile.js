import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';

function SideMenuMobile({ open, toggleDrawer }) {
  const [userData, setUserData] = React.useState({ email: "", avatar: "", role: "" });

  // Fetch user data from backend
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from local storage or any other secure storage
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in header for auth
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          email: data.email || "user@gmail.com", // Default email if not provided
          avatar: data.avatar || "/default-avatar.png", // Default avatar if not provided
          role: data.role || "employee", // Fallback role
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: '#154472',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        {/* User Info */}
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="User"
              src={userData.avatar || "/static/images/avatar/7.jpg"}
              sx={{ width: 36, height: 36 }}
            />
            <Typography component="p" variant="h6" sx={{ color: "#ffffff" }}>
              {userData.email} {/* Display the user's email */}
            </Typography>

          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        {/* Menu Content */}
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        {/* User Role and Logout */}
        <Stack sx={{ p: 2, gap: 1 }}>
          <Typography variant="caption" sx={{ color: "#ffffff" }}>
            {userData.role === "manager" ? "Manager" : "Employee"} {/* Role display */}
          </Typography>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack>

      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
