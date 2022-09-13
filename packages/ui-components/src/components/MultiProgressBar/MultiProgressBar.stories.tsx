import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MultiProgressBar, MultiProgressBarProps } from "./MultiProgressBar";
import { Stack } from "@mui/material";

export default {
  title: "Components/MultiProgressBar",
  component: MultiProgressBar,
} as ComponentMeta<typeof MultiProgressBar>;

interface Item {
  color: string;
  label: string;
  value: number;
}

const sampleItems1 = [
  {
    color: "#5936B6",
    label: "Label 1",
    value: 0.4,
  },
];

const sampleItems2 = [
  {
    color: "#B292F9",
    label: "Label 1",
    value: 0.6,
  },
  {
    color: "#5936B6",
    label: "Label 2",
    value: 0.4,
  },
];

const sampleItems3 = [
  {
    color: "#5936B6",
    label: "Label 1",
    value: 0.01,
  },
];

function getItemColor(item: Item): string {
  return item.color;
}

function getItemLabel(item: Item): string {
  return item.label;
}

function getItemValue(item: Item): number {
  return item.value;
}

const Template: Story<MultiProgressBarProps<Item>> = () => (
  <Stack spacing={1}>
    <MultiProgressBar
      items={sampleItems1}
      getItemColor={getItemColor}
      getItemLabel={getItemLabel}
      getItemValue={getItemValue}
      maxValue={1}
    />
    <MultiProgressBar
      items={sampleItems2}
      getItemColor={getItemColor}
      getItemLabel={getItemLabel}
      getItemValue={getItemValue}
      maxValue={1}
    />
    <MultiProgressBar
      items={sampleItems3}
      getItemColor={getItemColor}
      getItemLabel={getItemLabel}
      getItemValue={getItemValue}
      maxValue={1}
    />
  </Stack>
);

export const Example = Template.bind({});
