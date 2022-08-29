import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear } from "@visx/scale";
import { GridRows, GridColumns } from "./Grid.style";

export default {
  title: "Charts/Grid",
} as ComponentMeta<typeof GridRows>;

const width = 600;
const height = 400;

const xScale = scaleLinear({
  domain: [0, 30],
  range: [0, width],
});

const yScale = scaleLinear({
  domain: [0, 10],
  range: [height, 0],
});

const TemplateRows: ComponentStory<typeof GridRows> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #ddd" }}>
    <GridRows {...args} />
  </svg>
);

export const Rows = TemplateRows.bind({});
Rows.args = {
  scale: xScale,
  width,
};

const TemplateColumns: ComponentStory<typeof GridColumns> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #ddd" }}>
    <GridColumns {...args} />
  </svg>
);

export const Columns = TemplateColumns.bind({});
Columns.args = {
  scale: yScale,
  height,
};
