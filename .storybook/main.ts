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
  babel: async (options: any) => {
    // NOTE(michael 2023-01-30): By default Storybook adds a bunch of babel
    // plugins that end up causing syntax errors with some TypeScript features
    // (in particular constructor properties like `constructor(private foo:
    // number) { }`). I eventually just tried removing them so we get babel
    // defaults, and everything worked. Maybe because we're using a recent
    // version of babel we don't need all of those plugins.
    options["plugins"] = [];
    return options;
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
