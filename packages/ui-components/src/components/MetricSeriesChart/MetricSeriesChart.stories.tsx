import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";

import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";
import { theme } from "../../styles";
import { MetricSeriesChart, Series, SeriesType } from ".";

export default {
  title: "Charts/MetricSeriesChart",
  component: MetricSeriesChart,
} as ComponentMeta<typeof MetricSeriesChart>;

const width = 800;
const height = 600;

const Template: ComponentStory<typeof MetricSeriesChart> = (args) => (
  <MetricSeriesChart {...args} />
);

const vaccinationSeries: Series[] = [
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
];

export const Vaccination = Template.bind({});
Vaccination.args = {
  series: vaccinationSeries,
  width,
  height,
};
