import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MultiProgressBar, MultiProgressBarProps } from "./MultiProgressBar";

export default {
  title: "Charts/MultiProgressBar",
  component: MultiProgressBar,
} as ComponentMeta<typeof MultiProgressBar>;

interface Item {
  color: string;
  label: string;
  value: number;
}

const firstItem = {
  color: "#B292F9",
  label: "Label 1",
  value: 0.6,
};

const secondItem = {
  color: "#5936B6",
  label: "Label 2",
  value: 0.4,
};

function getItemLabel(item: Item): string {
  return item.label;
}

function getItemValue(item: Item): number {
  return item.value;
}

const Template: Story<MultiProgressBarProps<Item>> = (args) => (
  <MultiProgressBar
    {...args}
    getItemLabel={getItemLabel}
    getItemValue={getItemValue}
    maxValue={1}
  />
);

export const DefaultColors = Template.bind({});
DefaultColors.args = {
  items: [firstItem, secondItem],
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  items: [firstItem, secondItem],
  barColor: "#ff0303",
  bgColor: "#7d13bf",
};
