import { ComponentMeta, Story } from "@storybook/react";
import { LegendCategorical, LegendCategoricalProps } from ".";

import React from "react";

export default {
  title: "Components/LegendCategorical",
  component: LegendCategorical,
} as ComponentMeta<typeof LegendCategorical>;

interface Item {
  label: string;
  color: string;
}

const Template: Story<LegendCategoricalProps<Item>> = (args) => (
  <LegendCategorical {...args} />
);

const items: Item[] = [
  { label: "Legend item 1", color: "#90BE6D" },
  { label: "Legend item 2", color: "#F9C74F" },
  { label: "Legend item 3", color: "#F8961E" },
  { label: "Legend item 4", color: "#E16420" },
  { label: "Legend item 5", color: "#A10003" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemColor = (item: Item, itemIndex: number) => item.color;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemLabel = (item: Item, itemIndex: number) => item.label;

export const Horizontal = Template.bind({});
Horizontal.args = {
  items,
  getItemColor,
  getItemLabel,
};

export const Vertical = Template.bind({});
Vertical.args = {
  items,
  getItemColor,
  getItemLabel,
  orientation: "vertical",
};
