import {
  MetricDefinition,
  MetricCatalog,
  MockDataProvider,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";
import { theme } from "../styles";

export enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
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
    thresholds: [10, 100],
    levelSetId: "cases_mock",
  },
];

export const dataProviders = [
  new MockDataProvider(),
  new StaticValueDataProvider(),
];

const metricLevelSets = [
  {
    id: "cases_mock",
    levels: [
      { id: "low", name: "low", color: theme.palette.severity[100] },
      { id: "medium", name: "medium", color: theme.palette.severity[200] },
      { id: "high", name: "high", color: theme.palette.severity[500] },
    ],
    defaultLevel: { id: "unknown", color: theme.palette.border.default },
  },
];

export const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders, {
  metricLevelSets,
});

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
