import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PointMarker } from ".";

export default {
  title: "Charts/PointMarker",
  component: PointMarker,
} as ComponentMeta<typeof PointMarker>;

const Template: ComponentStory<typeof PointMarker> = (args) => (
  <svg width={100} height={100} style={{ border: "solid 1px #eee" }}>
    <PointMarker {...args} />
  </svg>
);

export const Example = Template.bind({});
Example.args = {
  x: 50,
  y: 50,
  fill: "#33eb91",
};
