import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ComponentLoaded } from ".";

export default {
  title: "Components/ComponentLoaded",
  component: ComponentLoaded,
} as ComponentMeta<typeof ComponentLoaded>;

const Template: ComponentStory<typeof ComponentLoaded> = (args) => (
  <ComponentLoaded {...args} />
);

export const Example = Template.bind({});
Example.args = {};
