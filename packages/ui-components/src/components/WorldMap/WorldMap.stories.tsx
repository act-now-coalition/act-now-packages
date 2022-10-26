import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WorldMap from "./WorldMap";

export default {
  title: "Maps/World Map",
  component: WorldMap,
} as ComponentMeta<typeof WorldMap>;

const Template: ComponentStory<typeof WorldMap> = (args) => (
  <WorldMap {...args} />
);

const getFillColor = (geoId: string) =>
  geoId.startsWith("A") ? "#014f86" : "#a9d6e5";

const renderTooltip = (geoId: string) => geoId;

export const Example = Template.bind({});
Example.args = {
  getFillColor,
  renderTooltip,
  width: 800,
};
