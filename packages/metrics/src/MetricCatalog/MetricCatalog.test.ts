import { renderHook } from "@testing-library/react-hooks";

import { states } from "@actnowcoalition/regions";

import { MetricCatalog, useCachedArrayIfEqual } from "./MetricCatalog";
import { SnapshotJSON } from "../data";
import { MockDataProvider, StaticValueDataProvider } from "../data_providers";

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
];

const testRegionWA = states.findByRegionIdStrict("53"); // Washington.
const testRegionCA = states.findByRegionIdStrict("06"); // California

/**
 * Test snapshot with data for PI metric for California.
 * NOTE: We set the PI metric to 3 instead of 3.1415... so that we can easily
 * identify if the data comes from the snapshot or not.
 */
const testSnapshot: SnapshotJSON = {
  metadata: { createdDate: "2022-08-04", latestDate: "2022-08-04" },
  data: {
    "06": {
      pi: {
        currentValue: 3,
        timeseriesPoints: [{ date: "2022-08-04", value: 3 }],
      },
    },
  },
};

describe("MetricCatalog", () => {
  test("getMetric()", () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders);
    expect(metricCatalog.getMetric(MetricId.PI).name).toStrictEqual("Pi");
    expect(() => {
      metricCatalog.getMetric("nothing");
    }).toThrow(`No metric found with id nothing`);
  });

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

    // Fetch data for two metrics that come from different data providers.
    const dataStore = await catalog.fetchDataForRegionsAndMetrics(
      [testRegionCA, testRegionWA],
      [MetricId.PI, MetricId.MOCK_CASES]
    );

    // Ensure PI metric is correct.
    expect(
      dataStore.regionData(testRegionCA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);
    expect(
      dataStore.regionData(testRegionWA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);

    // Ensure mock cases metric is correct (note since mock data is random, we
    // don't know the exact value).
    const valueCA = dataStore
      .regionData(testRegionCA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueCA).toBe("number");
    const valueWA = dataStore
      .regionData(testRegionWA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueWA).toBe("number");
  });

  test("fetchData() correctly reads from a snapshot.", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders, {
      snapshot: testSnapshot,
    });

    const data = await catalog.fetchData(
      testRegionCA,
      catalog.getMetric(MetricId.PI),
      /*includeTimeseries=*/ true
    );
    expect(data.currentValue).toStrictEqual(3);
    expect(data.timeseries.dates).toStrictEqual([new Date("2022-08-04")]);
    expect(data.timeseries.values).toStrictEqual([3]);
  });

  test("fetchData() falls back to data providers if snapshot doesn't have data", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders, {
      snapshot: testSnapshot,
    });

    const data = await catalog.fetchData(
      testRegionCA,
      catalog.getMetric(MetricId.MOCK_CASES),
      /*includeTimeseries=*/ true
    );
    expect(typeof data.currentValue).toEqual("number");
    expect(data.timeseries.hasData()).toEqual(true);
  });

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

describe("useCachedArrayIfEqual()", () => {
  test("example", () => {
    // Render with an initial array.
    const initialArray = ["testing"];
    const { result, rerender } = renderHook(
      ({ array }) => useCachedArrayIfEqual(array),
      {
        initialProps: {
          array: initialArray,
        },
      }
    );
    expect(result.current).toBe(initialArray);

    // Re-render with a different array instance but the same values.
    // Should still return the original array instance.
    rerender({ array: ["testing"] });
    expect(result.current).toBe(initialArray);

    // Re-render with a different array instance and different values.
    const newArray = ["testing", "new"];
    rerender({ array: newArray });
    expect(result.current).toBe(newArray);

    // Re-render with a different array instance but same values again.
    // Should still return the original array instance.
    rerender({ array: ["testing", "new"] });
    expect(result.current).toBe(newArray);
  });
});
