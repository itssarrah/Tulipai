import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenuMobile from "../components/SideMenuMobile"; // Make sure to import this correctly
import CustomDatePicker from "./CustomDatePicker";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <Stack
        direction="row"
        sx={{
          display: { xs: "flex", md: "none" }, // Show only on mobile
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
          pt: 1.5,
        }}
      >
        {/* Mobile Menu Button */}
        <IconButton onClick={toggleDrawer(true)} edge="start" sx={{ ml: 1 }}>
          <MenuIcon />
        </IconButton>

        {/* Optional: Other elements like date picker */}
        <CustomDatePicker />

        {/* Mobile Drawer */}
        <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
      </Stack>

      {/* Desktop Header */}
      <Stack
        direction="row"
        sx={{
          display: { xs: "none", md: "flex" }, // Show only on desktop
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1700px",
          pt: 1.5,
        }}
        spacing={2}
      >
        <Box sx={{ width: "200px" }} />
        <Stack direction="row" sx={{ gap: 1 }}>
          <CustomDatePicker />
          {/* Uncomment if needed */}
          {/* <ColorModeIconDropdown /> */}
        </Stack>
      </Stack>
    </>
  );
}
