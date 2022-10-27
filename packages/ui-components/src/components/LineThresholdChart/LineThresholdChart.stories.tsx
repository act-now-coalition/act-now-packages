import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  appleStockTimeseries as timeseries,
  createTimeseriesScales,
} from "../../stories/mockData";
import { theme } from "../../styles";
import { LineThresholdChart, LineThresholdInterval } from ".";

export default {
  title: "Charts/LineThresholdChart",
  component: LineThresholdChart,
} as ComponentMeta<typeof LineThresholdChart>;

const width = 600;
const height = 400;

const Template: ComponentStory<typeof LineThresholdChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineThresholdChart {...args} />
  </svg>
);

const { xScale, yScale } = createTimeseriesScales(timeseries, width, height);

const intervals: LineThresholdInterval[] = [
  { lower: 0, upper: 100, color: theme.palette.severity[100] },
  { lower: 100, upper: 400, color: theme.palette.severity[200] },
  { lower: 400, upper: 600, color: theme.palette.severity[300] },
  { lower: 600, upper: 800, color: theme.palette.severity[400] },
];

export const Example = Template.bind({});
Example.args = {
  timeseries,
  xScale,
  yScale,
  intervals,
};
