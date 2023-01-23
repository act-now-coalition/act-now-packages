import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoadedSentinel } from ".";

export default {
  title: "Components/LoadedSentinel",
  component: LoadedSentinel,
} as ComponentMeta<typeof LoadedSentinel>;

const Template: ComponentStory<typeof LoadedSentinel> = (args) => (
  <LoadedSentinel {...args} />
);

export const Example = Template.bind({});
Example.args = {};
