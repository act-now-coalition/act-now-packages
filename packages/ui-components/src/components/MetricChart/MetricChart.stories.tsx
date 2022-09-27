import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MetricChart } from "./MetricChart";
import { MetricChartProps } from "./interfaces";

import { scaleLinear, scaleTime } from "@visx/scale";
import { assert } from "@actnowcoalition/assert";
import { appleStockTimeseries } from "../../stories/mockData";

const [width, height] = [600, 400];
const padding = 20;

assert(appleStockTimeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = appleStockTimeseries;

const xScale = scaleTime({
  domain: [minDate, maxDate],
  range: [padding, width - padding],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [height - 2 * padding, padding],
});

export default {
  title: "Components/MetricChart",
  component: MetricChart,
} as ComponentMeta<typeof MetricChart>;

const Template: Story<MetricChartProps> = (args) => <MetricChart {...args} />;

export const Example = Template.bind({});
Example.args = {
  width,
  height,
  timeseries: appleStockTimeseries,
  // isMobile,
  // tooltipSubtext = "",
  marginTop: 10,
  marginBottom: 30,
  marginLeft: 70,
  marginRight: 20,
  xScale,
  yScale,
  // barOpacity,
  // barOpacityHover,
  // dateRange
};
