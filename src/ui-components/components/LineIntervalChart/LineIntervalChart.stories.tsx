import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LineInterval, LineIntervalChart } from ".";
import {
  createTimeseriesScales,
  appleStockTimeseries as timeseries,
} from "../../stories/mockData";
import { theme } from "../../styles";

export default {
  title: "Components/LineIntervalChart",
  component: LineIntervalChart,
} as ComponentMeta<typeof LineIntervalChart>;

const width = 600;
const height = 400;

const Template: ComponentStory<typeof LineIntervalChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineIntervalChart {...args} />
  </svg>
);

const { xScale, yScale } = createTimeseriesScales(timeseries, width, height);

const intervals: LineInterval[] = [
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
