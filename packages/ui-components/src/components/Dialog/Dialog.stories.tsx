import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Dialog } from ".";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Example = Template.bind({});
Example.args = {};
