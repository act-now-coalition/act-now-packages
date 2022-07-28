import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Meter from "./Meter";

export default {
  title: "Components/Meter",
  component: Meter,
} as ComponentMeta<typeof Meter>;

const Template: ComponentStory<typeof Meter> = (args) => <Meter {...args} />;

export const DefaultProps = Template.bind({});
DefaultProps.args = {
  minValue: 0,
  maxValue: 100,
  currentValue: 39,
  currentColor: "#5936B6",
  "aria-valuemin": 0,
  "aria-valuemax": 100,
  "aria-valuenow": 39,
  "aria-label": "Vaccination",
};

export const ARIALabelledBy = () => (
  <>
    <p id="meter-label">Vaccination Progress</p>
    <Meter aria-labelledby="meter-label" {...DefaultProps.args} />
  </>
);
