import React from "react";
import { states } from "@actnowcoalition/regions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { MetricSeriesChart, SeriesType, Series } from ".";
import { schemeCategory10 } from "d3-scale-chromatic";

export default {
  title: "Charts/MetricSeriesChart",
  component: MetricSeriesChart,
} as ComponentMeta<typeof MetricSeriesChart>;

const Template: ComponentStory<typeof MetricSeriesChart> = (args) => (
  <MetricSeriesChart {...args} />
);

const series: Series[] = [
  {
    region: states.findByRegionIdStrict("36"),
    metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
    type: SeriesType.LINE,
    lineProps: {
      stroke: schemeCategory10[0],
    },
  },
  {
    region: states.findByRegionIdStrict("56"),
    metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
    type: SeriesType.LINE,
    lineProps: {
      stroke: schemeCategory10[1],
    },
  },
  {
    region: states.findByRegionIdStrict("18"),
    metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
    type: SeriesType.LINE,
    lineProps: {
      stroke: schemeCategory10[2],
    },
  },
  {
    region: states.findByRegionIdStrict("32"),
    metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
    type: SeriesType.LINE,
    lineProps: {
      stroke: schemeCategory10[3],
      strokeDasharray: "4 8",
      strokeWidth: 4,
    },
  },
  {
    region: states.findByRegionIdStrict("18"),
    metric: metricCatalog.getMetric(MetricId.MOCK_CASES),
    type: SeriesType.LINE_THRESHOLDS,
  },
];

export const Example = Template.bind({});
Example.args = {
  width: 800,
  height: 600,
  series,
};
