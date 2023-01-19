import React from "react";

import { colors } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TimeseriesPoint } from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";

import { MetricChartTooltip } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricChartTooltip",
  component: MetricChartTooltip,
} as ComponentMeta<typeof MetricChartTooltip>;

const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");
const point: TimeseriesPoint<number> = {
  date: new Date("2022-03-15"),
  value: 12.54,
};

const [width, height] = [600, 400];

const Template: ComponentStory<typeof MetricChartTooltip> = (args) => (
  <svg
    width={width}
    height={height}
    style={{ backgroundColor: colors.blue[50] }}
  >
    <MetricChartTooltip {...args}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <circle r={60} fill={colors.purple[900]} />
        <text fill="white" textAnchor="middle" dominantBaseline="middle">
          Hover me
        </text>
      </g>
    </MetricChartTooltip>
  </svg>
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
  point,
  placement: "top",
};
