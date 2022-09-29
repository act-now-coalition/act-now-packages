import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeseriesPoint } from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";
import { colors } from "@mui/material";
import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";
import { MetricTooltip, MetricTooltipContent } from ".";

export default {
  title: "Charts/MetricTooltip",
  component: MetricTooltip,
} as ComponentMeta<typeof MetricTooltip>;

const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");
const point: TimeseriesPoint<number> = {
  date: new Date("2022-03-15"),
  value: 12.54,
};

const [width, height] = [600, 400];

const Template: ComponentStory<typeof MetricTooltip> = (args) => (
  <svg
    width={width}
    height={height}
    style={{ backgroundColor: colors.blue[50] }}
  >
    <MetricTooltip {...args}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <circle r={60} fill={colors.purple[900]} />
        <text fill="white" textAnchor="middle" dominantBaseline="middle">
          Hover me
        </text>
      </g>
    </MetricTooltip>
  </svg>
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
  point,
  placement: "top",
};

export const Content = () => (
  <MetricTooltipContent region={region} metric={metric} point={point} />
);
