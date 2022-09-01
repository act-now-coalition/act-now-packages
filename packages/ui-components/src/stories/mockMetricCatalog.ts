import {
  MetricDefinition,
  MetricCatalog,
  MockDataProvider,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";

export enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
  PASS_FAIL = "pass_fail",
}

const testMetricDefs: MetricDefinition[] = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: "static",
      value: 3.141592653589793,
    },
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
  {
    id: MetricId.PASS_FAIL,
    name: "Passing or Fail",
    extendedName: "Passing or Failing grade on an arbitrary test",
    dataReference: {
      providerId: "static",
      value: 0,
    },
    categories: [
      { color: "#d32f2f", value: 0, label: "Fail" },
      { color: "#4caf50", value: 1, label: "Pass" },
    ],
  },
];

export const dataProviders = [
  new MockDataProvider(),
  new StaticValueDataProvider(),
];
export const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders);

// Exporting a second metric catalog to confirm that the closest
// MetricCatalocProvider instance is used
const metricDefsB: MetricDefinition[] = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: "static",
      value: Math.PI,
    },
    formatOptions: { minimumFractionDigits: 2 },
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

export const metricCatalogB = new MetricCatalog(metricDefsB, dataProviders);
