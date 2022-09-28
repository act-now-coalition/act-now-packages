import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Axes, AxesProps } from "./Axes";

export default {
  title: "Charts/Axes",
} as ComponentMeta<typeof Axes>;

const width = 600;
const height = 400;
const padding = 60;

const dateScale = scaleTime({
  domain: [new Date("2022-01-01"), new Date()],
  range: [0, width - 2 * padding],
});

const yScale = scaleLinear({
  domain: [0, 500],
  range: [height - 2 * padding, 0],
});

const Template: Story<AxesProps> = (args) => (
  <svg width={width} height={height}>
    <Axes {...args} />
  </svg>
);

export const DefaultSettings = Template.bind({});
DefaultSettings.args = {
  height,
  padding,
  dateScale,
  yScale,
};

export const CustomNumYTicks = Template.bind({});
CustomNumYTicks.args = {
  height,
  padding,
  dateScale,
  yScale,
  yNumTicks: 5,
};
