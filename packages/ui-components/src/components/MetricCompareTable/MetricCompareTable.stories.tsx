import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { TableContainer } from "../CompareTable";
import { MetricCompareTable } from ".";

export default {
  title: "Metrics/MetricCompareTable",
  component: MetricCompareTable,
} as ComponentMeta<typeof MetricCompareTable>;

const Template: ComponentStory<typeof MetricCompareTable> = (args) => (
  <TableContainer sx={{ maxWidth: 600, height: 500 }}>
    <MetricCompareTable {...args} />
  </TableContainer>
);

export const Example = Template.bind({});
Example.args = {
  regions: states.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
};
