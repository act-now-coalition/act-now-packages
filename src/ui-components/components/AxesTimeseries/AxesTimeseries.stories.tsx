import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { formatPercent } from "src/number-format";

import { AxesTimeseries } from "./AxesTimeseries";

export default {
  title: "Components/AxesTimeseries",
} as ComponentMeta<typeof AxesTimeseries>;

const width = 600;
const height = 400;
const margin = 50;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

const xScale = scaleUtc({
  domain: [new Date("2022-01-01"), new Date("2022-10-31")],
  range: [0, chartWidth],
});

const yScale = scaleLinear({
  domain: [0, 500],
  range: [chartHeight, 0],
});

const yScalePercent = scaleLinear({
  domain: [0, 1.2],
  range: [chartHeight, 0],
});

const Template: ComponentStory<typeof AxesTimeseries> = (args) => (
  <svg width={width} height={height} style={{ border: "1px solid red" }}>
    <Group top={margin} left={margin}>
      <AxesTimeseries {...args} />
    </Group>
  </svg>
);

export const Default = Template.bind({});
Default.args = {
  height: chartHeight,
  xScale,
  yScale,
};

export const CustomNumYTicks = Template.bind({});
CustomNumYTicks.args = {
  height: chartHeight,
  xScale,
  yScale,
  axisLeftProps: {
    numTicks: 10,
  },
};

export const CustomYTickFormat = Template.bind({});
CustomYTickFormat.args = {
  height: chartHeight,
  xScale,
  yScale: yScalePercent,
  axisLeftProps: {
    tickFormat: (value: number) => formatPercent(value),
  },
};
