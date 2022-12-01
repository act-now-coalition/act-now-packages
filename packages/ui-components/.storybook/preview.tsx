import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { MetricCatalogProvider } from "../src/components/MetricCatalogContext";
import { metricCatalog } from "../src/stories/mockMetricCatalog";
import { theme } from "../src/styles";

/**
 * Note (Pablo): It seems that the order of the context providers matter, even
 * if they use different contexts. I noticed that if the ThemeProvider is the
 * outer provider, the styles for variant="paragraphSmall" on Typography are
 * not correctly applied.
 */
const appDecorator = (Story) => (
  <MetricCatalogProvider metricCatalog={metricCatalog}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
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

export const decorators = [appDecorator];
