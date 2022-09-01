import { renderHook } from "@testing-library/react-hooks";

import {
  MetricCatalog,
  MockDataProvider,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";

enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
}

const testMetricDefs = [
  {
    id: MetricId.PI,
    dataReference: {
      providerId: "static",
      value: 3.141592653589793,
    },
  },
  {
    id: MetricId.MOCK_CASES,
    dataReference: {
      providerId: "mock",
      startDate: "2020-01-01",
    },
  },
];

const testRegionWA = states.findByRegionIdStrict("53"); // Washington.
const testRegionCA = states.findByRegionIdStrict("06"); // California

describe("metric data hooks", () => {
  test("useDataForRegionsAndMetrics()", async () => {
    // This test makes sure that the hook gracefully handles being rendered
    // repeatedly with the same set of metrics / regions, even if the arrays
    // are not the exact same instances. In particular, each render should
    // not trigger additional metric fetches.

    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders);
    const metricPi = catalog.getMetric(MetricId.PI);
    const metricCases = catalog.getMetric(MetricId.MOCK_CASES);

    // Before we render the hook, the catalog should not have done any data fetches.
    let expectedFetches = 0;
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook initially.
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ regions, metrics }) =>
        catalog.useDataForRegionsAndMetrics(regions, metrics),
      {
        initialProps: {
          regions: [testRegionCA, testRegionWA],
          metrics: [metricPi, metricCases],
        },
      }
    );

    // The catalog should have performed a data fetch, but since it's anync,
    // initially the hook won't return data.
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    expect(result.current.data).toStrictEqual(undefined);
    // Wait for initial async fetch to finish.
    await waitForNextUpdate();
    expect(
      result.current.data?.metricData(testRegionCA, metricPi).currentValue
    ).toBe(Math.PI);

    // Render the hook again with new regions / metrics array instances but
    // containing the same values.  This should not perform a fetch.
    rerender({
      regions: [testRegionCA, testRegionWA],
      metrics: [metricPi, metricCases],
    });
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook again with different regions.  This should perform a fetch.
    rerender({ regions: [testRegionCA], metrics: [metricPi, metricCases] });
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    // Wait for async fetch to return the new data.
    await waitForNextUpdate();
    expect(result.current.data?.hasRegionData(testRegionWA)).toBe(false);
    expect(
      result.current.data?.metricData(testRegionCA, metricPi).currentValue
    ).toBe(Math.PI);

    // Render the hook again with different metrics.  This should perform a fetch.
    rerender({ regions: [testRegionCA], metrics: [metricPi] });
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    // Wait for async fetch to return the new data.
    await waitForNextUpdate();
    expect(
      result.current.data?.regionData(testRegionCA).hasMetricData(metricCases)
    ).toBe(false);
    expect(
      result.current.data?.metricData(testRegionCA, metricPi).currentValue
    ).toBe(Math.PI);
  });
});
