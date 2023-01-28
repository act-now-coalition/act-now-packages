import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { scaleLinear } from "@visx/scale";

import { AxisLeft } from ".";

export default {
  title: "Components/AxisLeft",
} as ComponentMeta<typeof AxisLeft>;

const width = 600;
const height = 400;
const padding = 60;

const scale = scaleLinear({
  domain: [0, 500],
  range: [height - 2 * padding, 0],
});

const DefaultTemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft {...args} left={padding} top={padding} />
  </svg>
);

export const Default = DefaultTemplateLeftAxis.bind({});
Default.args = {
  scale,
};

const TemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft {...args} left={padding} top={padding} />
  </svg>
);

export const CustomNumTicks = TemplateLeftAxis.bind({});
CustomNumTicks.args = {
  scale,
  // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
  numTicks: 10,
};
