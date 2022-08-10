import { states } from "@actnowcoalition/regions";

import { MetricCatalog } from "./MetricCatalog";
import { StaticValueDataProvider } from "../data_providers/StaticValueDataProvider";
import { MockDataProvider } from "../data_providers/MockDataProvider";

enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
}

const testMetricDefs = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: "static-value",
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
];

const testRegionWA = states.findByRegionIdStrict("53"); // Washington.
const testRegionCA = states.findByRegionIdStrict("06"); // California

describe("MetricCatalog", () => {
  test("fetchData()", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders);

    const data = await catalog.fetchData(testRegionWA, MetricId.PI);
    expect(data.currentValue).toBe(Math.PI);

    const data2 = await catalog.fetchData(testRegionWA, MetricId.MOCK_CASES);
    const value = data2.currentValue;
    expect(typeof value).toBe("number");
  });

  test("fetchDataForMetricsAndRegions()", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders);

    const dataStore = await catalog.fetchDataForMetricsAndRegions(
      [testRegionCA, testRegionWA],
      [MetricId.PI, MetricId.MOCK_CASES]
    );

    expect(
      dataStore.regionData(testRegionCA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);
    expect(
      dataStore.regionData(testRegionWA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);

    const valueCA = dataStore
      .regionData(testRegionCA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    const valueWA = dataStore
      .regionData(testRegionWA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueCA).toBe("number");
    expect(typeof valueWA).toBe("number");
  });
});
