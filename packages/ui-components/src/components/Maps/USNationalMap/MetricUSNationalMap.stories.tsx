import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MetricUSNationalMap } from "./MetricUSNationalMap";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../../stories/mockMetricCatalog";
import { MetricUSNationalMapProps } from "./interfaces";

export default {
  title: "Maps/US National",
  component: MetricUSNationalMap,
} as ComponentMeta<typeof MetricUSNationalMap>;

const Template: Story<MetricUSNationalMapProps> = (args) => (
  <MetricUSNationalMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return states.findByRegionIdStrict(regionId).fullName;
};

/** States colored by mock metric data */
export const MetricAwareStates = Template.bind({});
MetricAwareStates.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  metric: MetricId.MOCK_CASES,
};

/** Counties colored by mock metric data */
export const MetricAwareCounties = Template.bind({});
MetricAwareCounties.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  metric: MetricId.MOCK_CASES,
  showCounties: true,
};
