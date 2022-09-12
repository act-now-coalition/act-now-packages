import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import MetricUSStateMap from "./MetricUSStateMap";
import { MetricId } from "../../../stories/mockMetricCatalog";
import { MetricUSStateMapProps } from "./interfaces";
import { states, counties, RegionDB } from "@actnowcoalition/regions";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export default {
  title: "Components/USStateMap",
  component: MetricUSStateMap,
} as ComponentMeta<typeof MetricUSStateMap>;

const Template: Story<MetricUSStateMapProps> = (args) => (
  <MetricUSStateMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return statesAndCounties.findByRegionIdStrict(regionId).fullName;
};

/** New York colored by mock metric data */
export const MetricAwareNewYork = Template.bind({});
MetricAwareNewYork.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  metric: MetricId.MOCK_CASES,
};
