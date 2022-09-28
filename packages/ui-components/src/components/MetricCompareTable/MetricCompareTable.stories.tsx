import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Paper } from "@mui/material";
import { states, Region } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricCompareTable, RegionLinkComponentProp } from ".";

export default {
  title: "Metrics/MetricCompareTable",
  component: MetricCompareTable,
} as ComponentMeta<typeof MetricCompareTable>;

const Template: ComponentStory<typeof MetricCompareTable> = (args) => (
  <Paper sx={{ maxWidth: 600, height: 500, overflow: "auto" }}>
    <MetricCompareTable {...args} />
  </Paper>
);

const RegionLinkComponent: RegionLinkComponentProp = ({
  children,
  region,
}: {
  children: React.ReactNode;
  region: Region;
}) => (
  <a
    href={`/states/${region.slug}`}
    aria-label={region.shortName}
    style={{ display: "block", textDecoration: "none", color: "initial" }}
  >
    {children}
  </a>
);

export const Example = Template.bind({});
Example.args = {
  regions: states.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  RegionLinkComponent,
};

export const WithoutRegionLink = Template.bind({});
WithoutRegionLink.args = {
  regions: states.all,
  metrics: [MetricId.PI, MetricId.MOCK_CASES, MetricId.PASS_FAIL],
};
