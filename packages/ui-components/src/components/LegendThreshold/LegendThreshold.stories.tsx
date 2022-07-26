import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import LegendThreshold, { LegendThresholdProps } from "./LegendThreshold";
import { styled } from "../../styles";

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
  height,
  width,
  barHeight,
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

const StyledLegendThreshold = styled(LegendThreshold)`
  line {
    stroke: ${({ theme }) => theme.palette.grey[50]};
  }
  text {
    fill: ${({ theme }) => theme.palette.grey[50]};
  }
`;

export const StyledExample = () => (
  <div style={{ backgroundColor: "#555", padding: 16 }}>
    <StyledLegendThreshold {...DefaultProps.args} />
  </div>
);
