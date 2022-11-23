import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AxisLeft } from "./";
import React from "react";
import { scaleLinear } from "@visx/scale";

export default {
  title: "Charts/Axis Left",
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

export const DefaultLeftAxis = DefaultTemplateLeftAxis.bind({});
DefaultLeftAxis.args = {
  scale,
};

const TemplateLeftAxis: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft
      {...args}
      left={padding}
      top={padding}
      // Approximate (More info: https://airbnb.io/visx/docs/axis#Axis_numTicks)
      numTicks={10}
    />
  </svg>
);

export const LeftAxis = TemplateLeftAxis.bind({});
LeftAxis.args = {
  scale,
};
