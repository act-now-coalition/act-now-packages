import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import LegendThreshold, { LegendThresholdProps } from "./LegendThreshold";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

interface Item {
  value: number;
  label: string;
  color: string;
}

const Template: Story<LegendThresholdProps<Item>> = (args) => (
  <svg width={args.width} height={args.height}>
    <LegendThreshold {...args} />
  </svg>
);

const width = 300;
const height = 40;
const barHeight = 20;
const borderRadius = 4;

const items: Item[] = [
  { value: 10, label: "10", color: "#90BE6D" },
  { value: 20, label: "20", color: "#F9C74F" },
  { value: 30, label: "30", color: "#F8961E" },
  { value: 40, label: "40", color: "#E16420" },
  { value: 50, label: "50", color: "#A10003" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemValue = (item: Item, itemIndex: number) => item.value;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemColor = (item: Item, itemIndex: number) => item.color;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemLabel = (item: Item, itemIndex: number) => item.label;

export const Example = Template.bind({});
Example.args = {
  height,
  width,
  barHeight,
  borderRadius,
  items,
  getItemValue,
  getItemColor,
  getItemLabel,
};

export const WithLabels = Template.bind({});
WithLabels.args = { ...Example.args };

export const WithoutLabels = Template.bind({});
WithoutLabels.args = {
  ...Example.args,
  height: barHeight,
  showLabels: false,
};

export const Rounded = Template.bind({});
Rounded.args = {
  ...Example.args,
  height: barHeight,
  borderRadius: barHeight / 2,
  showLabels: false,
};

export const Squared = Template.bind({});
Squared.args = {
  ...Example.args,
  borderRadius: 0,
  showLabels: true,
};
