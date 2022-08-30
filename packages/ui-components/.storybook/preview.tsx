import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { MetricCatalogProvider } from "../src/components/MetricCatalogContext";
import { metricCatalog } from "../src/stories/mockMetricCatalog";
import { theme } from "../src/styles";

// Wraps stories with the MUI Theme provider
const themeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const metricCatalogDecorator = (Story) => (
  <MetricCatalogProvider metricCatalog={metricCatalog}>
    <Story />
  </MetricCatalogProvider>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Design System", "Components", "Charts"],
    },
  },
};

export const decorators = [themeDecorator, metricCatalogDecorator];
