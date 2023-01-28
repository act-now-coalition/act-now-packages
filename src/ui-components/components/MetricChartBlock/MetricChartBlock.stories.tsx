import React from "react";

import { Stack, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { nations } from "src/regions";

import { MetricChartBlock } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import { ShareButton } from "../ShareButton";

export default {
  title: "Components/MetricChartBlock",
  component: MetricChartBlock,
} as ComponentMeta<typeof MetricChartBlock>;

const Template: ComponentStory<typeof MetricChartBlock> = (args) => (
  <MetricChartBlock {...args} />
);

const metricList = [
  MetricId.APPLE_STOCK,
  MetricId.NYC_TEMPERATURE,
  MetricId.MOCK_CASES_NO_LEVELS,
];

export const Example = Template.bind({});
Example.args = {
  region: nations.findByRegionIdStrict("USA"),
  metrics: metricList,
  renderChartFooter: (metric) => (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="paragraphSmall">
        Explanatory content for {metric.name} metric.
      </Typography>
      <ShareButton url={"https://www.google.com"} quote={"Lorem ipsum"} />
    </Stack>
  ),
};
