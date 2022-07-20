import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LegendThreshold from ".";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

const Template: ComponentStory<typeof LegendThreshold> = (args) => (
  <svg width={args.width} height={args.height}>
    <LegendThreshold {...args} />
  </svg>
);

interface Item {
  value: number;
  label: string;
  color: string;
}

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

const getItemValue = (item: Item) => item.value;
const getItemColor = (item: Item) => item.color;
const getItemLabel = (item: Item) => item.label;

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
