import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Paper } from "@mui/material";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricCompareTable } from ".";

export default {
  title: "Metrics/MetricCompareTable",
  component: MetricCompareTable,
} as ComponentMeta<typeof MetricCompareTable>;

const Template: ComponentStory<typeof MetricCompareTable> = (args) => (
  <Paper sx={{ maxWidth: 600, height: 500, overflow: "auto" }}>
    <MetricCompareTable {...args} />
  </Paper>
);

export const Example = Template.bind({});
Example.args = {
  regions: states.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
};
