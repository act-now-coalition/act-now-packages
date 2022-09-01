import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Typography } from "@mui/material";
import { states } from "@actnowcoalition/regions";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
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

const metricCases = metricCatalog.getMetric(MetricId.MOCK_CASES);
const newYorkState = states.findByRegionIdStrict("36");

export const DefaultProps = Template.bind({});
DefaultProps.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
};

export const WithSupportingText = Template.bind({});
WithSupportingText.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  supportingText: metricCases.extendedName,
};

export const VerticalWithChart = Template.bind({});
VerticalWithChart.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  metricChart: <ChartPlaceholder />,
  supportingText: metricCases.extendedName,
};

export const DefaultHorizontal = Template.bind({});
DefaultHorizontal.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  orientation: "horizontal",
};

export const HorizontalWithSupportingText = Template.bind({});
HorizontalWithSupportingText.args = {
  region: newYorkState,
  metric: MetricId.MOCK_CASES,
  supportingText: metricCases.extendedName,
  orientation: "horizontal",
};
