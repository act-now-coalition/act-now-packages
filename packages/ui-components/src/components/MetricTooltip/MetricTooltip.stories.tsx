import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { colors } from "@mui/material";

import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";
import { MetricTooltip, MetricTooltipContent } from ".";

export default {
  title: "Components/MetricTooltip",
  component: MetricTooltip,
} as ComponentMeta<typeof MetricTooltip>;

const date = new Date("2022-03-15");
const value = 12.54;
const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");

const [width, height] = [600, 400];

const Template: ComponentStory<typeof MetricTooltip> = (args) => (
  <svg
    width={width}
    height={height}
    style={{ backgroundColor: colors.blue[50] }}
  >
    <MetricTooltip {...args}>
      <g>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={60}
          fill={colors.purple[900]}
        />
        <text
          x={300}
          y={200}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
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
  date,
  value,
  placement: "top",
};

export const Content = () => (
  <MetricTooltipContent
    region={region}
    metric={metric}
    date={date}
    value={value}
  />
);
