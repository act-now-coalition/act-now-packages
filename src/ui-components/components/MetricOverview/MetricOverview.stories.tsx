import React from "react";

import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { states } from "src/regions";

import { MetricOverview } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricOverview",
  component: MetricOverview,
} as ComponentMeta<typeof MetricOverview>;

const Template: ComponentStory<typeof MetricOverview> = (args) => (
  <div
    style={{
      width: args.orientation === "vertical" ? 160 : 320,
      border: "dashed 1px #eee",
    }}
  >
    <MetricOverview {...args} />
  </div>
);

const ChartPlaceholder = () => (
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
    <Typography variant="overline">placeholder</Typography>
  </div>
);

const newYorkState = states.findByRegionIdStrict("36");

export const Vertical = Template.bind({});
Vertical.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
};

export const VerticalWithoutExtendedName = Template.bind({});
VerticalWithoutExtendedName.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
};

export const VerticalWithChart = Template.bind({});
VerticalWithChart.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  metricChart: <ChartPlaceholder />,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  orientation: "horizontal",
};

export const HorizontalWithoutExtendedName = Template.bind({});
HorizontalWithoutExtendedName.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
  orientation: "horizontal",
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_ERROR,
};
