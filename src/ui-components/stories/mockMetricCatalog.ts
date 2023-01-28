import {
  MetricCatalog,
  MetricDefinition,
  MockDataProvider,
  StaticValueDataProvider,
} from "src/metrics";

import { theme } from "../styles";
import { AppleStockDataProvider } from "./MockAppleStockDataProvider";
import { NycTemperatureDataProvider } from "./NycTemperatureDataProvider";
import { RandomPointsBetweenZeroAndOneDataProvider } from "./RandomPointsBetweenZeroAndOneDataProvider";

export enum MetricId {
  APPLE_STOCK = "apple_stock",
  APPLE_STOCK_LOW_THRESHOLDS = "apple_stock_low_thresholds",
  NYC_TEMPERATURE = "nyc_temperature",
  PI = "pi",
  MOCK_CASES = "mock_cases",
  MOCK_CASES_NO_EXTENDED_NAME = "mock_cases_no_extended_name",
  MOCK_CASES_DELAY_1S = "mock_cases_delay_1s",
  MOCK_CASES_ERROR = "mock_cases_error",
  PASS_FAIL = "pass_fail",
  PASS_FAIL_NO_EXTENDED_NAME = "pass_fail_no_extended_name",
  RANDOM_POINTS_BETWEEN_ZERO_AND_ONE = "random_points_between_zero_and_one",
  MOCK_CASES_NO_LEVELS = "mock_cases_no_levels",
}

export enum ProviderId {
  MOCK = "mock",
  STATIC = "static",
  APPLE_STOCK = "apple_stock",
  NYC_TEMPERATURE = "nyc_temperature",
  RANDOM_POINTS_BETWEEN_ZERO_AND_ONE = "random_points_between_zero_and_one",
}

const defaultIntegerFormat: Intl.NumberFormatOptions = {
  maximumFractionDigits: 0,
};

const defaultDecimalFormat: Intl.NumberFormatOptions = {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
};

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
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.APPLE_STOCK_LOW_THRESHOLDS,
    name: "AAPL (low thresholds)",
    extendedName: "Apple Stock w/ low thresholds",
    dataReference: {
      providerId: ProviderId.APPLE_STOCK,
    },
    categoryThresholds: [0, 100, 200, 400],
    categorySetId: "5_risk_categories",
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.NYC_TEMPERATURE,
    name: "NYC Temperature",
    extendedName: "Temperature of New York City",
    dataReference: {
      providerId: ProviderId.NYC_TEMPERATURE,
    },
    categoryThresholds: [-20, 0, 10, 30],
    categorySetId: "5_risk_categories",
    formatOptions: defaultIntegerFormat,
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
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.MOCK_CASES_NO_LEVELS,
    name: "Cases (mock) - no levels",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
    },
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
    name: "Cases (mock) - without extended name",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
    },
    categoryThresholds: [10, 100],
    categorySetId: "cases_mock",
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.MOCK_CASES_DELAY_1S,
    name: "Cases (mock - delay 1s)",
    extendedName: "Cases per 100k population (using mock data w/ delay)",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
      delayMs: 1000,
    },
    categoryThresholds: [10, 100],
    categorySetId: "cases_mock",
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.MOCK_CASES_ERROR,
    name: "Cases (error)",
    extendedName: "Cases per 100k population (error)",
    dataReference: {
      providerId: ProviderId.MOCK,
      startDate: "2020-01-01",
      error: "Simulated error fetching data",
    },
    categoryThresholds: [10, 100],
    categorySetId: "cases_mock",
    formatOptions: defaultIntegerFormat,
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
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.PASS_FAIL_NO_EXTENDED_NAME,
    name: "Pass or Fail - without extended name",
    dataReference: {
      providerId: ProviderId.STATIC,
      value: 0,
    },
    categorySetId: "pass_fail",
    categoryValues: [0, 1],
    formatOptions: defaultIntegerFormat,
  },
  {
    id: MetricId.RANDOM_POINTS_BETWEEN_ZERO_AND_ONE,
    name: "Random decimal points",
    extendedName: "Random decimal points between zero and one",
    dataReference: {
      providerId: ProviderId.RANDOM_POINTS_BETWEEN_ZERO_AND_ONE,
    },
    categoryThresholds: [0.2, 0.4, 0.6, 0.8],
    categorySetId: "5_risk_categories",
    formatOptions: defaultDecimalFormat,
  },
];

export const dataProviders = [
  new MockDataProvider(ProviderId.MOCK),
  new StaticValueDataProvider(ProviderId.STATIC),
  new AppleStockDataProvider(ProviderId.APPLE_STOCK),
  new NycTemperatureDataProvider(ProviderId.NYC_TEMPERATURE),
  new RandomPointsBetweenZeroAndOneDataProvider(
    ProviderId.RANDOM_POINTS_BETWEEN_ZERO_AND_ONE
  ),
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
    formatOptions: defaultIntegerFormat,
  },
];

export const metricCatalogB = new MetricCatalog(metricDefsB, dataProviders);
