import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { LegendThreshold } from ".";
import { LegendThresholdProps } from "./interfaces";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

interface Item {
  color: string;
  label: string;
  sublabel: string;
}

const Template: Story<LegendThresholdProps<Item>> = (args) => (
  <LegendThreshold {...args} />
);

// Horizontal legend threshold props
const horizontalHeight = 20;

const items: Item[] = [
  { label: "10", sublabel: "Sublabel 1", color: "#90BE6D" },
  { label: "20", sublabel: "Sublabel 2", color: "#F9C74F" },
  { label: "30", sublabel: "Sublabel 3", color: "#F8961E" },
  { label: "40", sublabel: "Sublabel 4", color: "#E16420" },
  { label: "50", sublabel: "Sublabel 5", color: "#A10003" },
];

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
  items,
  getItemColor,
  getItemLabel,
};

export const HorizontalWithoutLabels = Template.bind({});
HorizontalWithoutLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalHeight,
  showLabels: false,
};

export const HorizontalRounded = Template.bind({});
HorizontalRounded.args = {
  ...HorizontalDefault.args,
  height: horizontalHeight,
  borderRadius: horizontalHeight / 2,
  showLabels: false,
};

export const HorizontalSquared = Template.bind({});
HorizontalSquared.args = {
  ...HorizontalDefault.args,
  borderRadius: 0,
};

export const VerticalDefault = Template.bind({});
VerticalDefault.args = {
  orientation: "vertical",
  items,
  getItemColor,
  getItemLabel,
  getItemSublabel,
};

export const VerticalRounded = Template.bind({});
VerticalRounded.args = {
  borderRadius: 8,
  ...VerticalDefault.args,
};

export const VerticalNoLabel = Template.bind({});
VerticalNoLabel.args = {
  showLabels: false,
  ...VerticalDefault.args,
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  height: 72,
  borderRadius: 8,
  showLabels: false,
  ...VerticalDefault.args,
};
