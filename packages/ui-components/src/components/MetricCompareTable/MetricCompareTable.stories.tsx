import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states, Region, RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { TableContainer } from "../CompareTable";
import { MetricCompareTable } from ".";

const regionDB = new RegionDB(states.all, {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

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
  regionDB,
  regions: regionDB.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...Example.args,
  metrics: [MetricId.PI, MetricId.MOCK_CASES_DELAY_1S, MetricId.PASS_FAIL],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...Example.args,
  metrics: [MetricId.PI, MetricId.MOCK_CASES_ERROR, MetricId.PASS_FAIL],
};
