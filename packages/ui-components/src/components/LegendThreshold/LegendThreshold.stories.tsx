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
  sublabel?: string;
  color: string;
}

const Template: Story<LegendThresholdProps<Item>> = (args) => (
  <LegendThreshold {...args} />
);

// Horizontal legend threshold props
const horizontalHeight = 40;
const horizontalBarHeight = 20;
const horizontalWidth = 300;

const horizontalItems: Item[] = [
  { label: "10", color: "#90BE6D" },
  { label: "20", color: "#F9C74F" },
  { label: "30", color: "#F8961E" },
  { label: "40", color: "#E16420" },
  { label: "50", color: "#A10003" },
];

// Vertical legend threshold props
const verticalWidth = 12;
const verticalHeight = 265;

const verticalItems: Item[] = [
  { label: "10", sublabel: "Supporting text 10", color: "#90BE6D" },
  { label: "20", sublabel: "Supporting text 20", color: "#F9C74F" },
  { label: "30", sublabel: "Supporting text 30", color: "#F8961E" },
  { label: "40", sublabel: "Supporting text 40", color: "#E16420" },
  { label: "50", sublabel: "Supporting text 50", color: "#A10003" },
];

const borderRadius = 4;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemColor = (item: Item, itemIndex: number) => item.color;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemLabel = (item: Item, itemIndex: number) => item.label;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemSublabel = (item: Item, itemIndex: number) => item.sublabel;

export const HorizontalDefault = Template.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  height: horizontalHeight,
  width: horizontalWidth,
  barHeight: horizontalBarHeight,
  borderRadius,
  showLabels: true,
  items: horizontalItems,
  getItemColor,
  getItemEndLabel: getItemLabel,
};

export const HorizontalWithoutLabels = Template.bind({});
HorizontalWithoutLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  showLabels: false,
};

export const HorizontalRounded = Template.bind({});
HorizontalRounded.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  borderRadius: horizontalBarHeight / 2,
  showLabels: false,
};

export const HorizontalSquared = Template.bind({});
HorizontalSquared.args = {
  ...HorizontalDefault.args,
  borderRadius: 0,
  showLabels: true,
};

export const VerticalDefault = Template.bind({});
VerticalDefault.args = {
  orientation: "vertical",
  height: verticalHeight,
  width: verticalWidth,
  borderRadius,
  items: verticalItems,
  showLabels: true,
  getItemLabel,
  getItemSublabel,
  getItemColor,
};

export const VerticalRounded = Template.bind({});
VerticalRounded.args = {
  ...VerticalDefault.args,
  borderRadius: verticalWidth / 2,
};

export const VerticalSquared = Template.bind({});
VerticalSquared.args = {
  ...VerticalDefault.args,
  borderRadius: 0,
};

export const VerticalNoLabel = Template.bind({});
VerticalNoLabel.args = {
  ...VerticalDefault.args,
  width: 72 / 5,
  height: 72,
  borderRadius: 8,
  showLabels: false,
};
