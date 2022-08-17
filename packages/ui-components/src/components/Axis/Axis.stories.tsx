import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "./Axis.style";
import { theme } from "../../styles";

export default {
  title: "Charts/Axis",
  component: AxisLeft,
} as ComponentMeta<typeof AxisLeft>;

const width = 669;
const height = 458;
const padding = 60;

const xScale = scaleLinear({
  domain: [0, 100],
  range: [0, width - 2 * padding],
});

const yScale = scaleLinear({
  domain: [0, 500],
  range: [height - 2 * padding, 0],
});

const TemplateAxisBottom: ComponentStory<typeof AxisBottom> = (args) => (
  <svg width={width} height={height}>
    <AxisBottom {...args} left={padding} top={padding} />
  </svg>
);

export const XAxis = TemplateAxisBottom.bind({});
XAxis.args = {
  scale: xScale,
  label: "Count (units)",
};

const TemplateAxisLeft: ComponentStory<typeof AxisLeft> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft
      {...args}
      left={padding}
      top={padding}
      numTicks={5}
      hideTicks
      stroke={theme.palette.border.default}
    />
  </svg>
);

export const YAxis = TemplateAxisLeft.bind({});
YAxis.args = {
  scale: yScale,
};
