import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MultiRegionMultiMetricChart } from ".";
import { metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MultiRegionMultiMetricChart",
  component: MultiRegionMultiMetricChart,
} as ComponentMeta<typeof MultiRegionMultiMetricChart>;

const Template: ComponentStory<typeof MultiRegionMultiMetricChart> = (args) => (
  <MultiRegionMultiMetricChart {...args} />
);

export const Example = Template.bind({});
Example.args = {
  regions: states.all,
  metrics: metricCatalog.metrics,
  initialMetric: metricCatalog.metrics[1],
  initialRegions: states.all.slice(0, 5),
};
