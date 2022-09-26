import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BannerTest } from ".";

export default {
  title: "Components/BannerTest",
  component: BannerTest,
} as ComponentMeta<typeof BannerTest>;

const Template: ComponentStory<typeof BannerTest> = (args) => (
  <BannerTest {...args} />
);

export const Example = Template.bind({});
Example.args = {
  color: "red",
};

export const BlueBox = Template.bind({});
BlueBox.args = {
  color: "blue",
};
