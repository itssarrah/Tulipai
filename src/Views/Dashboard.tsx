// src/Components/Dashboard/Dashboard.tsx
import * as React from "react";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../Components/Dashboard/theme/customizations";

import DashboardLayout from "../Components/Dashboard/DashboardLayout.tsx";
import MainGrid from "../Components/Dashboard/components/MainGrid";
import { Box, Stack } from "@mui/material";
import Header from "../Components/Dashboard/components/Header.js";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <DashboardLayout>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <MainGrid />
      </Stack>
    </DashboardLayout>
  );
}
