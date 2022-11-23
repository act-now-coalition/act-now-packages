import { AxisBottom, AxisLeft } from "../Axis";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridColumns, GridRows } from "./";

import React from "react";
import { scaleLinear } from "@visx/scale";

export default {
  title: "Charts/Grid",
} as ComponentMeta<typeof GridRows>;

const width = 600;
const height = 400;
const padding = 25;
const innerWidth = width - padding * 2;
const innerHeight = height - padding * 2;

const xScale = scaleLinear({
  domain: [0, 30],
  range: [0, innerWidth],
});

const yScale = scaleLinear({
  domain: [0, 10],
  range: [innerHeight, 0],
});

const TemplateRows: ComponentStory<typeof GridRows> = (args) => (
  <svg width={width} height={height}>
    <AxisLeft left={padding} top={padding} scale={args.scale} />
    <GridRows left={padding} top={padding} {...args} />
  </svg>
);

export const Rows = TemplateRows.bind({});
Rows.args = {
  scale: yScale,
  width: innerWidth,
};

const TemplateColumns: ComponentStory<typeof GridColumns> = (args) => (
  <svg width={width} height={height}>
    <GridColumns left={padding} {...args} />
    <AxisBottom left={padding} top={innerHeight} scale={args.scale} />
  </svg>
);

export const Columns = TemplateColumns.bind({});
Columns.args = {
  scale: xScale,
  height: innerHeight,
};
