import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LineChart } from ".";
import {
  createTimeseriesScales,
  appleStockTimeseries as timeseries,
} from "../../stories/mockData";

export default {
  title: "Components/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const [width, height] = [600, 400];

const Template: ComponentStory<typeof LineChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineChart {...args} />
  </svg>
);

const { xScale, yScale } = createTimeseriesScales(timeseries, width, height);

export const DefaultSolidLine = Template.bind({});
DefaultSolidLine.args = {
  timeseries,
  xScale,
  yScale,
  stroke: "#2a9d8f",
};

export const DottedLine = Template.bind({});
DottedLine.args = {
  timeseries,
  xScale,
  yScale,
  strokeWidth: 1,
  strokeDasharray: "2 2",
};
