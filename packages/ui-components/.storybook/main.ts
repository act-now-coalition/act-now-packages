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
};
