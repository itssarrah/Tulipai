// theme/getSignUpTheme.ts
import { createTheme } from "@mui/material/styles";

// Define your custom Tailwind color palette
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
    default: "#D6E7EE", // Light Blue for light mode
    paper: "#ffffff", // White for light mode paper
  },
  text: {
    primary: "#154472", // Dark Blue for primary text
    secondary: "#6b7280", // Tailwind gray-600 for secondary text
  },
};

const getSignUpTheme = (mode: "light" | "dark") => {
  return createTheme({
    // palette: {
    //   mode,
    //   primary: {
    //     main: colors.primary.main,
    //     contrastText: colors.primary.contrastText,
    //   },
    //   secondary: {
    //     main: colors.secondary.main,
    //     contrastText: colors.secondary.contrastText,
    //   },
    //   ...(mode === "light"
    //     ? {
    //         background: {
    //           default: colors.background.default,
    //           paper: colors.background.paper,
    //         },
    //         text: {
    //           primary: colors.text.primary,
    //           secondary: colors.text.secondary,
    //         },
    //       }
    //     : {
    //         background: {
    //           default: "#fff", // Dark Blue for dark mode
    //           paper: "#1f2937", // Tailwind gray-800 for dark mode paper
    //         },
    //         text: {
    //           primary: "#ffffff", // White text for dark mode
    //           secondary: "#d1d5db", // Tailwind gray-300 for secondary text
    //         },
    //       }),
    // },
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
            borderRadius: "0.5rem",
            padding: "0.75rem 1.5rem",
          },
        },
      },
    },
  });
};

export default getSignUpTheme;
