import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProgressBar } from ".";
import React from "react";

export default {
  title: "Charts/ProgressBar",
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <>
    <p id="progress-bar-label">Percent Vaccinated</p>
    <ProgressBar {...args} />
  </>
);

export const DefaultProps = Template.bind({});
DefaultProps.args = {
  maxValue: 100,
  value: 39,
  color: "#5936B6",
};
