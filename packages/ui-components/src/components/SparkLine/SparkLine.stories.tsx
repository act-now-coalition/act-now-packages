import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import { SparkLine } from ".";
import { appleStockTimeseries } from "../../stories/mockData";
import { assert } from "@actnowcoalition/assert";

export default {
  title: "Charts/SparkLine",
  component: SparkLine,
} as ComponentMeta<typeof SparkLine>;

const timeseries = appleStockTimeseries.filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-01-31"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const Template: ComponentStory<typeof SparkLine> = (args) => (
  <SparkLine
    timeseriesBarChart={args.timeseriesBarChart}
    timeseriesLineChart={args.timeseriesLineChart}
    barWidth={args.barWidth}
  />
);

export const Example = Template.bind({});
Example.args = {
  timeseriesBarChart: timeseries,
  timeseriesLineChart: timeseries,
};
