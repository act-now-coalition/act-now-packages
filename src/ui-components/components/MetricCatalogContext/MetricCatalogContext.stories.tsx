import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricCatalog, MetricDefinition } from "../../../metrics";
import { states } from "../../../regions";
import {
  MetricId,
  ProviderId,
  dataProviders,
} from "../../stories/mockMetricCatalog";
import MetricAwareDemo from "./MetricAwareDemo";
import { MetricCatalogProvider } from "./MetricCatalogContext";

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
      providerId: ProviderId.STATIC,
      value: Math.PI,
    },
    formatOptions: { maximumSignificantDigits: 2 },
  },
  {
    id: MetricId.MOCK_CASES,
    name: "Cases Per 100k (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: ProviderId.MOCK,
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
export const WithDecorator = () => (
  <MetricAwareDemo metric={MetricId.PI} region={washingtonState} />
);
