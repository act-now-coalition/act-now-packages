import { resolve } from "path";

export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  features: {
    // This enables generating stories.json to allow Storybook composition
    // https://storybook.js.org/docs/react/sharing/storybook-composition
    buildStoriesJson: true,
  },
  webpackFinal: async (config: any) => {
    // Add "src" alias so we can resolve imports like "src/assert" For
    // TypeScript this is handled by setting baseUrl to "." but Storybook /
    // webpack doesn't respect this by default.
    return {
      ...config,
      resolve: {
        ...config?.resolve,
        alias: {
          ...config?.resolve?.alias,
          src: resolve(__dirname, "../src"),
        },
      },
    };
  },
};
