import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ErrorBox } from ".";

export default {
  title: "Components/ErrorBox",
  component: ErrorBox,
} as ComponentMeta<typeof ErrorBox>;

const Template: ComponentStory<typeof ErrorBox> = (args) => (
  <ErrorBox {...args} />
);

export const Example = Template.bind({});
Example.args = {};

export const CustomSizeAndText = Template.bind({});
CustomSizeAndText.args = {
  width: 200,
  height: 100,
  children: "Something failed.",
};
