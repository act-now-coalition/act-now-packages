import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, states } from "@actnowcoalition/regions";

import { MetricCompareTable } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import { SortDirection, TableContainer } from "../CompareTable";

const regionDB = new RegionDB(states.all, {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

export default {
  title: "Components/MetricCompareTable",
  component: MetricCompareTable,
} as ComponentMeta<typeof MetricCompareTable>;

const Template: ComponentStory<typeof MetricCompareTable> = (args) => (
  <TableContainer sx={{ maxWidth: 600, height: 500 }}>
    <MetricCompareTable {...args} />
  </TableContainer>
);

export const DefaultSortOrder = Template.bind({});
DefaultSortOrder.args = {
  regionDB,
  regions: regionDB.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
};

export const InitialSortOrder = Template.bind({});
InitialSortOrder.args = {
  regionDB,
  regions: regionDB.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  sortColumnId: MetricId.MOCK_CASES,
  sortDirection: SortDirection.ASC,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...DefaultSortOrder.args,
  metrics: [MetricId.PI, MetricId.MOCK_CASES_DELAY_1S, MetricId.PASS_FAIL],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...DefaultSortOrder.args,
  metrics: [MetricId.PI, MetricId.MOCK_CASES_ERROR, MetricId.PASS_FAIL],
};
