import { assert } from "@actnowcoalition/assert";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import React from "react";

import { BarChart } from ".";
import { appleStockTimeseries } from "../../stories/mockData";
import { LineChart } from "../LineChart";

export default {
  title: "Charts/BarChart",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;

const [width, height] = [600, 400];
const padding = 30;
const barPadding = 3;
const innerWidth = width - 2 * padding;
const innerHeight = height - 2 * padding;
const fill = "#2a9d8f";

const Template: ComponentStory<typeof BarChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <Group left={padding} top={padding}>
      <BarChart {...args} />
    </Group>
  </svg>
);

const timeseries = appleStockTimeseries.filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-01-31"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = timeseries;

const numDays = 31;
const dayWidth = Math.floor(innerWidth / numDays);
const xScale = scaleUtc({
  domain: [minDate, maxDate],
  range: [0, innerWidth - dayWidth],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [innerHeight, 0],
});

export const Example = Template.bind({});
Example.args = {
  timeseries,
  xScale,
  yScale,
  fill,
  barWidth: dayWidth - barPadding,
};

export const WithLineChart = () => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <rect
      y={padding}
      x={padding}
      width={innerWidth}
      height={innerHeight}
      fill="#eee"
    />
    <Group top={padding} left={padding + 0.5 * dayWidth}>
      <Group left={-0.5 * dayWidth}>
        <BarChart
          timeseries={timeseries}
          xScale={xScale}
          yScale={yScale}
          fill={fill}
          fillOpacity={0.3}
          barWidth={dayWidth - barPadding}
        />
      </Group>
      {timeseries.points.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={xScale(p.date)}
          cy={yScale(p.value)}
          r={4}
          fill="black"
        />
      ))}
      <LineChart timeseries={timeseries} xScale={xScale} yScale={yScale} />
    </Group>
  </svg>
);
