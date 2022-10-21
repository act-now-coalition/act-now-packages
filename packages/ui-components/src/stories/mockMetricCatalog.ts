import {
  MetricDefinition,
  MetricCatalog,
  MockDataProvider,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";
import { theme } from "../styles";
import { AppleStockDataProvider } from "./MockAppleStockDataProvider";

export enum MetricId {
  APPLE_STOCK = "apple_stock",
  PI = "pi",
  MOCK_CASES = "mock_cases",
  MOCK_CASES_NO_EXTENDED_NAME = "mock_cases_no_extended_name",
  PASS_FAIL = "pass_fail",
}

const testMetricDefs: MetricDefinition[] = [
  {
    id: MetricId.APPLE_STOCK,
    name: "AAPL",
    extendedName: "Apple Stock",
    dataReference: {
      providerId: "apple_stock",
    },
    thresholds: [100, 300, 400, 500],
    levelSetId: "5_risk_categories",
  },
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
    name: "Cases (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: "mock",
      startDate: "2020-01-01",
    },
    thresholds: [40, 100],
    levelSetId: "cases_mock",
  },
  {
    id: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
    name: "Cases (mock)",
    extendedName: "",
    dataReference: {
      providerId: "mock",
      startDate: "2020-01-01",
    },
    thresholds: [10, 100],
    levelSetId: "cases_mock",
  },
  {
    id: MetricId.PASS_FAIL,
    name: "Pass or Fail",
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
  new AppleStockDataProvider(),
];

const metricLevelSets = [
  {
    id: "cases_mock",
    levels: [
      { id: "low", name: "low", color: theme.palette.severity[100] },
      {
        id: "medium",
        name: "medium",
        color: theme.palette.severity[200],
        description: "indicates medium case incidence.",
      },
      {
        id: "high",
        name: "high",
        color: theme.palette.severity[500],
        description: "indicates high case incidence.",
      },
    ],
    defaultLevel: { id: "unknown", color: theme.palette.border.default },
  },
  {
    id: "5_risk_categories",
    levels: [
      { id: "low", name: "Low", color: theme.palette.severity[100] },
      {
        id: "medium",
        name: "Medium",
        color: theme.palette.severity[200],
        description: "medium",
      },
      {
        id: "high",
        name: "High",
        color: theme.palette.severity[300],
        description: "high",
      },
      {
        id: "very_high",
        name: "Very high",
        color: theme.palette.severity[400],
        description: "Very high",
      },
      {
        id: "critical",
        name: "Critical",
        color: theme.palette.severity[500],
        description: "Critical",
      },
    ],
    defaultLevel: { id: "unknown", color: theme.palette.border.default },
  },
];

export const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders, {
  metricLevelSets,
});

// Exporting a second metric catalog to confirm that the closest
// MetricCatalogProvider instance is used
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
