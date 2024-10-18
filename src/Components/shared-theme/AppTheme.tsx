import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const colors = {
  primary: {
    main: "#207FB8", // Medium Blue
    contrastText: "#ffffff", // White for text on primary
  },
  secondary: {
    main: "#89FFD6", // Mint Green
    contrastText: "#000000", // Black for text on secondary
  },
  background: {
    default: "#ffffff", // Light Blue for light mode
    paper: "#ffffff", // White for light mode paper
  },
  text: {
    primary: "#154472", // Dark Blue for primary text
    secondary: "#6b7280", // Tailwind gray-600 for secondary text
  },
};

const AppTheme = ({ children }) => {
  const theme = createTheme({
    palette: {
      ...colors,
    },
    typography: {
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      h4: {
        fontSize: "2.15rem",
      },
      button: {
        textTransform: "none",
        fontWeight: "600",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#72E0D4", // Mint Green background for buttons
            color: colors.secondary.contrastText, // Black text color for mint green
            borderRadius: "0.5rem",
            padding: "0.75rem 1.5rem",
            "&:hover": {
              backgroundColor: "#63C8C1", // Darker shade of mint green for hover
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
