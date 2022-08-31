import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricCatalog, MetricDefinition } from "@actnowcoalition/metrics";
import { MetricCatalogProvider } from "./MetricCatalogContext";
import { MetricId, dataProviders } from "../../stories/mockMetricCatalog";
import MetricAwareDemo from "./MetricAwareDemo";

export default {
  title: "Components/MetricCatalogContext",
  component: MetricCatalogProvider,
} as ComponentMeta<typeof MetricCatalogProvider>;

// Setting up a custom metricCatalog to confirm that the MetricCatalogProvider
// closets to the component using the hook prevails.
const metricDefs: MetricDefinition[] = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName:
      "Pi - The ratio of a circle's circumference to its diameter (should be formatted as 3.1)",
    dataReference: {
      providerId: "static",
      value: Math.PI,
    },
    formatOptions: { maximumSignificantDigits: 2 },
  },
  {
    id: MetricId.MOCK_CASES,
    name: "Cases Per 100k (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: "mock",
      startDate: "2020-01-01",
    },
  },
];

const metricCatalog = new MetricCatalog(metricDefs, dataProviders);

const Template: ComponentStory<typeof MetricCatalogProvider> = (args) => (
  <MetricCatalogProvider metricCatalog={metricCatalog}>
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

// This story is not directly wrapped on MetricCatalogProvider, so is
// using the MetricCatalogProvider setup as a decorator in
// .storybook/preview.tsx
export const UsingDecorator = () => (
  <MetricAwareDemo metric={MetricId.PI} region={washingtonState} />
);
