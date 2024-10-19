import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import { Link } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
const mainListItems = [
  { text: "Dashboard", icon: <HomeRoundedIcon />, url: "/dashboard" },
  { text: "Expenses", icon: <AnalyticsRoundedIcon />, url: "/expenses" },
  { text: "Profits/Income", icon: <MonetizationOnIcon />, url: "/income" },
  { text: "Reports", icon: <PictureAsPdfIcon />, url: "/report" },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              mt: index === 1 ? 2 : 0,
            }}
          >
            <Link to={item.url}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon
                  sx={{ fontSize: "20px !important", color: "#89FFD6" }}
                >
                  {" "}
                  {}
                  {React.cloneElement(item.icon, { fontSize: "inherit" })} {}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: "#ffffff",
                      fontSize: "20px !important",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
