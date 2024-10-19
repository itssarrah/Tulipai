import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const [userData, setUserData] = useState({ email: "", avatar: "", role: "" });

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from local storage or any other secure storage
        const token = localStorage.getItem("token");
        console.log(token);
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

        // Set the fetched user data (email, avatar, role) into the state
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
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "#154472",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      ></Box>
      <Divider />
      <img src="/whitelogo.png" alt="logo" className="w-[5vw] mx-auto my-4" />
      <Divider />

      <MenuContent />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="User"
          src={
            userData.avatar ? userData.avatar : "/static/images/avatar/7.jpg"
          }
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px", color: "#ffffff" }}
          >
            {userData.email}
            {/* User's email from backend */}
          </Typography>
          <Typography variant="caption" sx={{ color: "#ffffff" }}>
            {userData.role === "manager" ? "Manager" : "Employee"}{" "}
            {/* Role-based display */}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
