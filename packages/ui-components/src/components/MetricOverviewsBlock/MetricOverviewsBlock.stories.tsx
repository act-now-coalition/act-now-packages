import React from "react";

import { Box, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MetricOverviewsBlock } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricOverviewsBlock",
  component: MetricOverviewsBlock,
} as ComponentMeta<typeof MetricOverviewsBlock>;

const Template: ComponentStory<typeof MetricOverviewsBlock> = (args) => (
  <Box sx={{ border: "1px solid #eee" }}>
    <MetricOverviewsBlock {...args} />
  </Box>
);

const ChartPlaceholder = (name: string) => (
  <div
    style={{
      backgroundColor: "#eee",
      borderRadius: 4,
      display: "grid",
      placeItems: "center",
      textTransform: "uppercase",
      minHeight: 72,
    }}
  >
    <Typography variant="overline">{name}</Typography>
  </div>
);

const defaultArgs = {
  region: states.findByRegionIdStrict("12"),
  metrics: [
    MetricId.APPLE_STOCK,
    MetricId.MOCK_CASES,
    MetricId.NYC_TEMPERATURE,
  ],
};

export const Example = Template.bind({});
Example.args = defaultArgs;

export const ExampleWithCharts = Template.bind({});
ExampleWithCharts.args = {
  ...defaultArgs,
  metricCharts: {
    [MetricId.APPLE_STOCK]: ChartPlaceholder("Apple Stock"),
    [MetricId.MOCK_CASES]: ChartPlaceholder("Mock Cases"),
    [MetricId.NYC_TEMPERATURE]: ChartPlaceholder("NYC Temperature"),
  },
};
