import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ProgressBar } from ".";

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
  "aria-label": "Vaccination",
};

export const ARIALabelledBy = Template.bind({});
ARIALabelledBy.args = {
  "aria-labelledby": "meter-label",
  minValue: 0,
  maxValue: 100,
  value: 75,
  color: "#5936B6",
};
