import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SparkLine } from ".";
import { validate } from "../../../validate";
import { appleStockTimeseries } from "../../stories/mockData";

export default {
  title: "Components/SparkLine",
  component: SparkLine,
} as ComponentMeta<typeof SparkLine>;

const timeseries = appleStockTimeseries.filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-01-31"),
});
validate(timeseries.hasData(), `Timeseries cannot be empty`);

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
