import React from "react";

import { ComponentMeta, Story } from "@storybook/react";

import { LegendThreshold, LegendThresholdProps } from "./LegendThreshold";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

interface Item {
  color: string;
  label: string;
  sublabel: string;
  showIndicator?: boolean;
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

const itemsWithIndicator: Item[] = [
  {
    label: "10",
    sublabel: "Sublabel 1",
    color: "#90BE6D",
    showIndicator: true,
  },
  {
    label: "20",
    sublabel: "Sublabel 2",
    color: "#F9C74F",
    showIndicator: false,
  },
  {
    label: "30",
    sublabel: "Sublabel 3",
    color: "#F8961E",
    showIndicator: false,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemColor = (item: Item, itemIndex: number) => item.color;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemLabel = (item: Item, itemIndex: number) => item.label;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemSublabel = (item: Item, itemIndex: number) => item.sublabel;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemShowIndicator = (item: Item, itemIndex: number) =>
  item.showIndicator;

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

export const HorizontalWithIndicator = Template.bind({});
HorizontalWithIndicator.args = {
  orientation: "horizontal",
  height: horizontalHeight,
  items: itemsWithIndicator,
  getItemColor,
  getItemLabel,
  getItemShowIndicator,
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

export const VerticalWithoutLabels = Template.bind({});
VerticalWithoutLabels.args = {
  ...VerticalDefault.args,
  showLabels: false,
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  ...VerticalDefault.args,
  height: 72,
  borderRadius: 8,
  showLabels: false,
};
