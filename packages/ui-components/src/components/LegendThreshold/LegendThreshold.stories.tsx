import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LegendThreshold from ".";

export default {
  title: "Components/LegendThreshold",
  component: LegendThreshold,
} as ComponentMeta<typeof LegendThreshold>;

const Template: ComponentStory<typeof LegendThreshold> = (args) => (
  <LegendThreshold {...args} />
);

export const Example = Template.bind({});
Example.args = {};
