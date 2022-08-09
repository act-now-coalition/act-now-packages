import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import LegendThreshold from ".";
import { LegendThresholdProps } from "./LegendThreshold";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

interface Item {
  label: string;
  color: string;
}

const Template: Story<LegendThresholdProps<Item>> = (args) => (
  <LegendThreshold {...args} />
);

const width = 300;
const height = 40;
const barHeight = 20;
const borderRadius = 4;

const verticalWidth = 14.4;
const verticalHeight = 60;

const items: Item[] = [
  { label: "10", color: "#90BE6D" },
  { label: "20", color: "#F9C74F" },
  { label: "30", color: "#F8961E" },
  { label: "40", color: "#E16420" },
  { label: "50", color: "#A10003" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemColor = (item: Item, itemIndex: number) => item.color;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemEndLabel = (item: Item, itemIndex: number) => item.label;

export const DefaultProps = Template.bind({});
DefaultProps.args = {
  orientation: "horizontal",
  height,
  width,
  barHeight,
  borderRadius,
  items,
  getItemColor,
  getItemEndLabel,
};

export const VerticalProps = Template.bind({});
VerticalProps.args = {
  orientation: "vertical",
  height: verticalHeight,
  width: verticalWidth,
  barHeight: verticalHeight,
  borderRadius,
  items,
  getItemColor,
  getItemEndLabel,
};

export const WithLabels = Template.bind({});
WithLabels.args = { ...DefaultProps.args };

export const WithoutLabels = Template.bind({});
WithoutLabels.args = {
  ...DefaultProps.args,
  height: barHeight,
  showLabels: false,
};

export const Rounded = Template.bind({});
Rounded.args = {
  ...DefaultProps.args,
  height: barHeight,
  borderRadius: barHeight / 2,
  showLabels: false,
};

export const Squared = Template.bind({});
Squared.args = {
  ...DefaultProps.args,
  borderRadius: 0,
  showLabels: true,
};
