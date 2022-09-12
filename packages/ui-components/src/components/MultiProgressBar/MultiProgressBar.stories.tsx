import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MultiProgressBar, MultiProgressBarProps } from "./MultiProgressBar";

export default {
  title: "Components/MultiProgressBar",
  component: MultiProgressBar,
} as ComponentMeta<typeof MultiProgressBar>;

interface Item {
  color: string;
  label: string;
  value: number;
}

const items = [
  {
    color: "red",
    label: "Red",
    value: 0.9,
  },
  {
    color: "blue",
    label: "Blue",
    value: 0.8,
  },
  {
    color: "yellow",
    label: "Yellow",
    value: 0.7,
  },
  {
    color: "green",
    label: "Green",
    value: 0.6,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemColor(item: Item, itemIndex: number): string {
  return item.color;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemLabel(item: Item, itemIndex: number): string {
  return item.label;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemValue(item: Item, itemIndex: number): number {
  return item.value;
}

const Template: Story<MultiProgressBarProps<Item>> = (args) => (
  <MultiProgressBar {...args} />
);

export const Example = Template.bind({});
Example.args = {
  items,
  getItemColor,
  getItemLabel,
  getItemValue,
  bgColor: "grey",
  width: 200,
};
