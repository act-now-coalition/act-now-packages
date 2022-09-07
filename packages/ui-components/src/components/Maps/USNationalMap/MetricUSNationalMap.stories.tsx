import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import MetricUSNationalMap, {
  MetricUSNationalMapProps,
} from "./MetricUSNationalMap";
import { states } from "@actnowcoalition/regions";
import { defaultWidth } from "../../../common/geo-shapes";
import { MetricId } from "../../../stories/mockMetricCatalog";

export default {
  title: "Components/USNationalMap",
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
  width: defaultWidth,
  metric: MetricId.MOCK_CASES,
};
