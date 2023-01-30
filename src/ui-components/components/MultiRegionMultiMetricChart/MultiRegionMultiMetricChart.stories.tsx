import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import first from "lodash/first";
import last from "lodash/last";
import sortBy from "lodash/sortBy";

import { MultiRegionMultiMetricChart } from ".";
import { states } from "../../../regions";
import { TimeUnit } from "../../../time-utils";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { TimePeriod, timePeriodOption } from "./utils";

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
  timePeriodOption(1, TimeUnit.WEEKS),
  timePeriodOption(2, TimeUnit.WEEKS),
  timePeriodOption(1, TimeUnit.MONTHS),
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
