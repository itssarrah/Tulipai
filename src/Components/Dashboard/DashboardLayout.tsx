// src/Components/Dashboard/DashboardLayout.tsx
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import SideMenu from "./components/SideMenu"; // Desktop Sidebar
import Header from "./components/Header"; // Header
import SideMenuMobile from "./components/SideMenuMobile"; // Mobile Sidebar

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu drawer
  const toggleMobileMenu = (open: boolean) => () => {
    setMobileMenuOpen(open);
  };

  // Check if the screen size is mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Desktop Sidebar */}
      {!isMobile && <SideMenu />}

      {/* Mobile Sidebar */}
      {isMobile && (
        <SideMenuMobile open={mobileMenuOpen} toggleDrawer={toggleMobileMenu} />
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : theme.palette.background.default,
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header toggleMobileMenu={toggleMobileMenu} /> {/* Pass down the toggle function */}
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
