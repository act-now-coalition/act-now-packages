import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import first from "lodash/first";
import last from "lodash/last";
import sortBy from "lodash/sortBy";

import { states } from "@actnowcoalition/regions";
import { TimeUnit } from "@actnowcoalition/time-utils";

import { MultiRegionMultiMetricChart } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { TimePeriod, createTimePeriodOption } from "./utils";

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

const customTimePeriods: TimePeriod[] = [
  createTimePeriodOption(1, TimeUnit.WEEKS),
  createTimePeriodOption(2, TimeUnit.WEEKS),
  createTimePeriodOption(1, TimeUnit.MONTHS),
];

export const WithCustomPeriods = Template.bind({});
WithCustomPeriods.args = {
  regions: sortedStates,
  metrics: metricCatalog.metrics,
  initialMetric: MetricId.MOCK_CASES,
  initialRegions: sortedStates.slice(0, 5),
  timePeriods: customTimePeriods,
  initialTimePeriod: last(customTimePeriods),
};

export const WithNoData = Template.bind({});
WithNoData.args = {
  ...Example.args,
  initialMetric: MetricId.PI,
  timePeriods: customTimePeriods,
  initialTimePeriod: first(customTimePeriods),
};
