import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import WorldMap from "./WorldMap";

export default {
  title: "Components/WorldMap",
  component: WorldMap,
} as ComponentMeta<typeof WorldMap>;

const Template: ComponentStory<typeof WorldMap> = (args) => (
  <WorldMap {...args} />
);

const getFillColor = (geoId: string) =>
  geoId.startsWith("A") ? "#014f86" : "#a9d6e5";

const renderTooltip = (geoId: string) => geoId;

export const World = Template.bind({});
World.args = {
  getFillColor,
  renderTooltip,
};
