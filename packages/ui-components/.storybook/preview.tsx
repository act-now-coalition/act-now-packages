import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { MetricCatalogProvider } from "../src/components/MetricCatalogContext";
import { metricCatalog } from "../src/stories/mockMetricCatalog";
import { darkTheme, theme } from "../src/styles";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const themes = {
  [Theme.LIGHT]: theme,
  [Theme.DARK]: darkTheme,
};

// Adds a "theme" selector to StoryBook that we'll use to choose the theme
// we render.
export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: Theme.LIGHT,
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: Theme.LIGHT, left: "️☀️", title: "Light mode" },
        { value: Theme.DARK, left: "🌙", title: "Dark mode" },
      ],
    },
  },
};

/**
 * Note (Pablo): It seems that the order of the context providers matter, even
 * if they use different contexts. I noticed that if the ThemeProvider is the
 * outer provider, the styles for variant="paragraphSmall" on Typography are
 * not correctly applied.
 */
const appDecorator = (Story, context) => {
  const selectedTheme = themes[context.globals.theme ?? Theme.LIGHT];
  return (
    <MetricCatalogProvider metricCatalog={metricCatalog}>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </MetricCatalogProvider>
  );
};

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
