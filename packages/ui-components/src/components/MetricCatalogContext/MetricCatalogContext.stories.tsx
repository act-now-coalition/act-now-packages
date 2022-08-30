import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricCatalogProvider } from "./MetricCatalogContext";
import { metricCatalogB, MetricId } from "../../stories/mockMetricCatalog";
import MetricAwareDemo from "./MetricAwareDemo";

export default {
  title: "Components/MetricCatalogContext",
  component: MetricCatalogProvider,
} as ComponentMeta<typeof MetricCatalogProvider>;

// Storybook already has a decorator with a MetricCatalogProvider, this one
// is provided as usage example.
const Template: ComponentStory<typeof MetricCatalogProvider> = (args) => (
  <MetricCatalogProvider metricCatalog={metricCatalogB}>
    {args.children}
  </MetricCatalogProvider>
);

const washingtonState = states.findByRegionIdStrict("53");

export const Mock = Template.bind({});
Mock.args = {
  children: (
    <MetricAwareDemo metric={MetricId.MOCK_CASES} region={washingtonState} />
  ),
};

export const Static = Template.bind({});
Static.args = {
  children: <MetricAwareDemo metric={MetricId.PI} region={washingtonState} />,
};

export const UsingDecorator = () => (
  <MetricAwareDemo metric={MetricId.PI} region={washingtonState} />
);
