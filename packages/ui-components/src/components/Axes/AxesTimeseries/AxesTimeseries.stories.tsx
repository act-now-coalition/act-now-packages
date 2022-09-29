import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxesTimeseries, AxesTimeseriesProps } from "./AxesTimeseries";
import { Group } from "@visx/group";

export default {
  title: "Charts/AxesTimeseries",
} as ComponentMeta<typeof AxesTimeseries>;

const width = 600;
const height = 400;
const margin = 50;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

const dateScale = scaleTime({
  domain: [new Date("2022-01-01"), new Date()],
  range: [0, chartWidth],
});

const yScale = scaleLinear({
  domain: [0, 500],
  range: [chartHeight, 0],
});

const Template: Story<AxesTimeseriesProps> = (args) => (
  <svg width={width} height={height} style={{ border: "1px solid red" }}>
    <Group top={margin} left={margin}>
      <AxesTimeseries {...args} />
    </Group>
  </svg>
);

export const DefaultSettings = Template.bind({});
DefaultSettings.args = {
  height: chartHeight,
  dateScale,
  yScale,
};

export const CustomNumYTicks = Template.bind({});
CustomNumYTicks.args = {
  height: chartHeight,
  dateScale,
  yScale,
  yNumTicks: 5,
};