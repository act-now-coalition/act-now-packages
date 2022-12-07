import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import sortBy from "lodash/sortBy";

import { states } from "@actnowcoalition/regions";

import { MultiRegionMultiMetricChart } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

const sortedStates = sortBy(states.all, (state) => state.shortName);

export default {
  title: "Components/MultiRegionMultiMetricChart",
  component: MultiRegionMultiMetricChart,
} as ComponentMeta<typeof MultiRegionMultiMetricChart>;

const Template: ComponentStory<typeof MultiRegionMultiMetricChart> = (args) => (
  <MultiRegionMultiMetricChart {...args} />
);

export const Example = Template.bind({});
Example.args = {
  regions: sortedStates,
  metrics: metricCatalog.metrics,
  initialMetric: MetricId.MOCK_CASES,
  initialRegions: sortedStates.slice(0, 5),
};
