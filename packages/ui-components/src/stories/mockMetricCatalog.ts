import {
  MetricDefinition,
  MetricCatalog,
  MockDataProvider,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";
import { theme } from "../styles";
import { AppleStockDataProvider } from "./MockAppleStockDataProvider";
import { NYCtempDataProvider } from "./NYCtempDataProvider";

export enum MetricId {
  APPLE_STOCK = "apple_stock",
  NYC_TEMP = "nyc_temperature",
  PI = "pi",
  MOCK_CASES = "mock_cases",
  MOCK_CASES_NO_EXTENDED_NAME = "mock_cases_no_extended_name",
  PASS_FAIL = "pass_fail",
}

export enum ProviderId {
  MOCK = "mock",
  STATIC = "static",
  APPLE_STOCK = "apple_stock",
  NYC_TEMP = "nyc_temperature",
}

const testMetricDefs: MetricDefinition[] = [
  {
    id: MetricId.APPLE_STOCK,
    name: "AAPL",
    extendedName: "Apple Stock",
    dataReference: {
      providerId: ProviderId.APPLE_STOCK,
    },
    categoryThresholds: [100, 200, 400, 800],
    categorySetId: "5_risk_categories",
  },
  {
    id: MetricId.NYC_TEMP,
    name: "NYC Temperature",
    extendedName: "Temperature of New York City",
    dataReference: {
      providerId: ProviderId.NYC_TEMP,
    },
    categoryThresholds: [-20, 0, 10, 15],
    categorySetId: "5_risk_categories",
  },
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: ProviderId.STATIC,
      value: 3.141592653589793,
    },
  },
  {
    id: MetricId.MOCK_CASES,
    name: "Cases (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
    },
    categoryThresholds: [40, 100],
    categorySetId: "cases_mock",
  },
  {
    id: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
    name: "Cases (mock)",
    extendedName: "",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
    },
    categoryThresholds: [10, 100],
    categorySetId: "cases_mock",
  },
  {
    id: MetricId.PASS_FAIL,
    name: "Pass or Fail",
    extendedName: "Passing or Failing grade on an arbitrary test",
    dataReference: {
      providerId: ProviderId.STATIC,
      value: 0,
    },
    categorySetId: "pass_fail",
    categoryValues: [0, 1],
  },
];

export const dataProviders = [
  new MockDataProvider(ProviderId.MOCK),
  new StaticValueDataProvider(ProviderId.STATIC),
  new AppleStockDataProvider(ProviderId.APPLE_STOCK),
  new NYCtempDataProvider(ProviderId.NYC_TEMP),
];

const metricCategorySets = [
  {
    id: "cases_mock",
    categories: [
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
    defaultCategory: { id: "unknown", color: theme.palette.border.default },
  },
  {
    id: "pass_fail",
    categories: [
      { id: "fail", color: "#d32f2f", name: "Fail" },
      { id: "pass", color: "#4caf50", name: "Pass" },
    ],
    defaultCategory: { id: "unknown", color: theme.palette.border.default },
  },
  {
    id: "5_risk_categories",
    categories: [
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
    defaultCategory: { id: "unknown", color: theme.palette.border.default },
  },
];

export const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders, {
  categorySets: metricCategorySets,
});

// Exporting a second metric catalog to confirm that the closest
// MetricCatalogProvider instance is used
const metricDefsB: MetricDefinition[] = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: ProviderId.STATIC,
      value: Math.PI,
    },
    formatOptions: { minimumFractionDigits: 2 },
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

export const metricCatalogB = new MetricCatalog(metricDefsB, dataProviders);
