import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { assert } from "@actnowcoalition/assert";
import { theme } from "../../styles";
import { SolidLine } from "../LineChart/LineChart.stories";
import { LineChartLevels } from ".";

const width = 600;
const height = 400;

export default {
  title: "Charts/LineChartLevels",
  component: LineChartLevels,
} as ComponentMeta<typeof LineChartLevels>;

const timeseries = SolidLine.args?.timeseries;
assert(timeseries?.hasData(), "Timeseries cannot be empty");

const { minValue, maxValue, minDate, maxDate } = timeseries;

const xScale = scaleTime({
  domain: [minDate, maxDate],
  range: [0, width],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [height, 0],
});

const Template: ComponentStory<typeof LineChartLevels> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineChartLevels {...args} />
  </svg>
);

const levelLow = { color: theme.palette.severity[100], id: "low" };
const levelMedium = { color: theme.palette.severity[200], id: "medium" };
const levelHigh = { color: theme.palette.severity[300], id: "high" };

export const Example = Template.bind({});
Example.args = {
  timeseries,
  xScale,
  yScale,
  chartLevels: [
    { from: minValue, to: 200, level: levelLow },
    { from: 200, to: 500, level: levelMedium },
    { from: 500, to: maxValue, level: levelHigh },
  ],
};

export const TwoLevels = Template.bind({});
TwoLevels.args = {
  timeseries,
  xScale,
  yScale,
  chartLevels: [
    { from: minValue, to: 200, level: levelLow },
    { from: 200, to: maxValue, level: levelHigh },
  ],
};

const yScaleInverted = scaleLinear({
  domain: [minValue, maxValue],
  range: [0, height],
});

export const Inverted = Template.bind({});
Inverted.args = {
  timeseries,
  xScale,
  yScale: yScaleInverted,
  chartLevels: [
    { from: minValue, to: 150, level: levelLow },
    { from: 150, to: maxValue, level: levelHigh },
  ],
};
