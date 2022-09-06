import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SparkLine from ".";
import { scaleLinear, scaleUtc } from "@visx/scale";
import { Group } from "@visx/group";
import { appleStock } from "@visx/mock-data";
import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

export default {
  title: "Charts/SparkLine",
  component: SparkLine,
} as ComponentMeta<typeof SparkLine>;

const [width, height] = [150, 50];
const [innerWidth, innerHeight] = [145, 45];
const padding = 2;

// We format the points from appleStock to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const points = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(`${p.date.replace(/T.*/, "")}`),
    value: p.close,
  })
);

const timeseries = new Timeseries(points).filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-01-31"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = timeseries;

const xScale = scaleUtc({
  domain: [minDate, maxDate],
  range: [0, innerWidth],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [innerHeight, 0],
});

const Template: ComponentStory<typeof SparkLine> = (args) => (
  <svg width={width} height={height}>
    <Group top={padding} left={padding}>
      <SparkLine
        timeseries={args.timeseries}
        xScale={args.xScale}
        yScale={args.yScale}
        barWidth={args.barWidth}
      />
    </Group>
  </svg>
);

export const Example = Template.bind({});
Example.args = {
  timeseries,
  xScale,
  yScale,
};
