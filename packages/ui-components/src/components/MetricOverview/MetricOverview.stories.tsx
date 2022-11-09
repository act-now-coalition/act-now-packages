import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricOverview } from ".";

export default {
  title: "Metrics/MetricOverview",
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

export const DefaultProps = Template.bind({});
DefaultProps.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
};

export const NoExtendedName = Template.bind({});
NoExtendedName.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
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

export const VerticalWithChart = Template.bind({});
VerticalWithChart.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  metricChart: <ChartPlaceholder />,
};

export const DefaultHorizontal = Template.bind({});
DefaultHorizontal.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  orientation: "horizontal",
};

export const HorizontalNoExtendedName = Template.bind({});
HorizontalNoExtendedName.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
  orientation: "horizontal",
};
