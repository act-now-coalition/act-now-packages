import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { nations } from "@actnowcoalition/regions";

import { MetricChartBlock } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import { AutoWidth } from "../AutoWidth";
import { ShareButton } from "../ShareButton";

export default {
  title: "Components/MetricChartBlock",
  component: MetricChartBlock,
} as ComponentMeta<typeof MetricChartBlock>;

const Template: ComponentStory<typeof MetricChartBlock> = (args) => (
  <Box maxWidth={800}>
    <AutoWidth>
      <MetricChartBlock {...args} />
    </AutoWidth>
  </Box>
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
