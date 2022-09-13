import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricLevel } from "@actnowcoalition/metrics";
import { theme } from "../../styles";
import { SolidLine as LineChartExample } from "../LineChart/LineChart.stories";
import { LineChartLevels } from ".";

export default {
  title: "Charts/LineChartLevels",
  component: LineChartLevels,
} as ComponentMeta<typeof LineChartLevels>;

const width = 600;
const height = 400;

const Template: ComponentStory<typeof LineChartLevels> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineChartLevels {...args} />
  </svg>
);

const levels: MetricLevel[] = [
  { id: "low", color: theme.palette.severity[100] },
  { id: "medium", color: theme.palette.severity[200] },
  { id: "high", color: theme.palette.severity[300] },
  { id: "very-high", color: theme.palette.severity[400] },
];

const thresholds = [100, 200, 300];

export const Example = Template.bind({});
Example.args = {
  ...LineChartExample.args,
  levels,
  thresholds,
};
