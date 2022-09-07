import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import MetricUSNationalMap from "./MetricUSNationalMap";
import { MetricUSNationalMapProps } from "./MetricUSNationalMap";
import { states } from "@actnowcoalition/regions";
import { defaultWidth } from "../../../common/geo-shapes";
import { MetricId } from "../../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricUSNationalMap",
  component: MetricUSNationalMap,
} as ComponentMeta<typeof MetricUSNationalMap>;

const Template: Story<MetricUSNationalMapProps> = (args) => (
  <MetricUSNationalMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return states.findByRegionIdStrict(regionId).fullName;
};

/** States colored by mock metric data */
export const StatesColoredByMetric = Template.bind({});
StatesColoredByMetric.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  width: defaultWidth,
  metric: MetricId.MOCK_CASES,
};
