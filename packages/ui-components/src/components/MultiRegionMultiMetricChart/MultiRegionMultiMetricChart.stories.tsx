import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import last from "lodash/last";
import sortBy from "lodash/sortBy";

import { states } from "@actnowcoalition/regions";
import { TimeUnit, subtractTime } from "@actnowcoalition/time-utils";

import { MultiRegionMultiMetricChart } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { TimePeriod } from "./utils";

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

const today = new Date();
const customTimePeriods: TimePeriod[] = [
  {
    label: "Past week",
    dateRange: { startAt: subtractTime(today, 1, TimeUnit.WEEKS) },
  },
  {
    label: "Past 2 weeks",
    dateRange: { startAt: subtractTime(today, 2, TimeUnit.WEEKS) },
  },
  {
    label: "Past month",
    dateRange: { startAt: subtractTime(today, 1, TimeUnit.MONTHS) },
  },
  { label: "All time", dateRange: undefined },
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
