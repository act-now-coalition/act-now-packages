import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { schemeCategory10 } from "d3-scale-chromatic";
import { states } from "@actnowcoalition/regions";

import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { theme } from "../../styles";
import { MetricSeriesChart, SeriesType } from ".";

export default {
  title: "Charts/MetricSeriesChart",
  component: MetricSeriesChart,
} as ComponentMeta<typeof MetricSeriesChart>;

const width = 800;
const height = 600;

const Template: ComponentStory<typeof MetricSeriesChart> = (args) => (
  <MetricSeriesChart {...args} />
);

export const Vaccination = Template.bind({});
Vaccination.args = {
  width,
  height,
  series: [
    {
      region: states.findByRegionIdStrict("56"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: {
        stroke: theme.palette.gradient[100],
      },
    },
    {
      region: states.findByRegionIdStrict("53"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: {
        stroke: theme.palette.gradient[300],
      },
    },
  ],
};

export const NegativeMinValue = Template.bind({});
NegativeMinValue.args = {
  width,
  height,
  minValue: -10,
  series: [
    {
      region: states.findByRegionIdStrict("56"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: { stroke: "#000" },
    },
  ],
};

export const TrendsSingleLocation = Template.bind({});
TrendsSingleLocation.args = {
  width,
  height,
  series: [
    {
      region: states.findByRegionIdStrict("53"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.BAR,
    },
    {
      region: states.findByRegionIdStrict("53"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: {
        stroke: "black",
      },
    },
  ],
};

export const TrendsMultipleLocations = Template.bind({});
TrendsMultipleLocations.args = {
  width,
  height,
  series: [
    {
      region: states.findByRegionIdStrict("36"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[0] },
    },
    {
      region: states.findByRegionIdStrict("56"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[1] },
    },
    {
      region: states.findByRegionIdStrict("18"),
      metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
      type: SeriesType.LINE,
      lineProps: {
        stroke: schemeCategory10[2],
        strokeDasharray: "4 4",
      },
    },
  ],
};
