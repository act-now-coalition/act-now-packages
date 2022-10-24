import { renderHook } from "@testing-library/react-hooks";

import {
  MetricCatalog,
  MetricData,
  MultiMetricDataStore,
  MultiRegionMultiMetricDataStore,
  StaticValueDataProvider,
} from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";
import {
  DataOrError,
  useData,
  useDataForMetrics,
  useDataForRegionsAndMetrics,
} from "./metric-data";
import { MetricCatalogProvider } from "../../components/MetricCatalogContext";
import { ReactNode } from "react";
import React from "react";

enum MetricId {
  PI = "pi",
  E = "e",
}

const testMetricDefs = [
  {
    id: MetricId.PI,
    dataReference: {
      providerId: "static",
      value: Math.PI,
    },
  },
  {
    id: MetricId.E,
    dataReference: {
      providerId: "static",
      value: Math.E,
    },
  },
];
const dataProviders = [new StaticValueDataProvider()];

const testRegionWA = states.findByRegionIdStrict("53"); // Washington.
const testRegionCA = states.findByRegionIdStrict("06"); // California

describe("metric data hooks", () => {
  test("useDataForRegionsAndMetrics()", async () => {
    const { catalog, wrapper } = createCatalogAndWrapper();

    // Before we render the hook, the catalog should not have done any data fetches.
    let expectedFetches = 0;
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook initially.
    const { result, waitForNextUpdate, rerender } = renderHook<
      any,
      DataOrError<MultiRegionMultiMetricDataStore>
    >(
      ({ regions, metrics }) =>
        useDataForRegionsAndMetrics(
          regions,
          metrics,
          /*includeTimeseries=*/ true
        ),
      {
        initialProps: {
          regions: [testRegionCA, testRegionWA],
          metrics: [MetricId.PI, MetricId.E],
        },
        wrapper,
      }
    );

    // The catalog should have performed a data fetch, but since it's anync,
    // initially the hook won't return data.
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    expect(result.current.data).toStrictEqual(undefined);
    // Wait for initial async fetch to finish.
    await waitForNextUpdate();
    expect(
      result.current.data?.metricData(testRegionCA, MetricId.PI).currentValue
    ).toBe(Math.PI);

    // Render the hook again with new regions / metrics array instances but
    // containing the same values. This should *not* perform a fetch.
    rerender({
      regions: [testRegionCA, testRegionWA],
      metrics: [MetricId.PI, MetricId.E],
    });
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook again with different regions / metrics.  This should perform a fetch.
    rerender({ regions: [testRegionWA], metrics: [MetricId.E] });
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    // Data should go back to loading state.
    expect(result.current.data).toStrictEqual(undefined);

    // Wait for async fetch to return the new data.
    await waitForNextUpdate();
    expect(result.current.data?.hasRegionData(testRegionCA)).toBe(false);
    expect(result.current.data?.hasMetricData(testRegionWA, MetricId.PI)).toBe(
      false
    );
    expect(
      result.current.data?.metricData(testRegionWA, MetricId.E).currentValue
    ).toBe(Math.E);
  });

  test("useDataForMetrics()", async () => {
    const { catalog, wrapper } = createCatalogAndWrapper();

    // Before we render the hook, the catalog should not have done any data fetches.
    let expectedFetches = 0;
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook initially.
    const { result, waitForNextUpdate, rerender } = renderHook<
      any,
      DataOrError<MultiMetricDataStore>
    >(
      ({ region, metrics }) =>
        useDataForMetrics(region, metrics, /*includeTimeseries=*/ true),
      {
        initialProps: {
          region: testRegionCA,
          metrics: [MetricId.PI, MetricId.E],
        },
        wrapper,
      }
    );

    // The catalog should have performed a data fetch, but since it's anync,
    // initially the hook won't return data.
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    expect(result.current.data).toStrictEqual(undefined);
    // Wait for initial async fetch to finish.
    await waitForNextUpdate();
    expect(result.current.data?.metricData(MetricId.PI).currentValue).toBe(
      Math.PI
    );

    // Render the hook again with new regions / metrics array instances but
    // containing the same values. This should *not* perform a fetch.
    rerender({
      region: testRegionCA,
      metrics: [MetricId.PI, MetricId.E],
    });
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook again with different metrics.  This should perform a fetch.
    rerender({ region: testRegionCA, metrics: [MetricId.E] });
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    // Data should go back to loading state.
    expect(result.current.data).toStrictEqual(undefined);

    // Wait for async fetch to return the new data.
    await waitForNextUpdate();
    expect(result.current.data?.hasMetricData(MetricId.PI)).toBe(false);
    expect(result.current.data?.metricData(MetricId.E).currentValue).toBe(
      Math.E
    );
  });

  test("useData()", async () => {
    const { catalog, wrapper } = createCatalogAndWrapper();

    // Before we render the hook, the catalog should not have done any data fetches.
    let expectedFetches = 0;
    expect(catalog.dataFetchesCount).toBe(expectedFetches);

    // Render the hook initially.
    const { result, waitForNextUpdate, rerender } = renderHook<
      any,
      DataOrError<MetricData>
    >(
      ({ region, metric }) =>
        useData(region, metric, /*includeTimeseries=*/ true),
      {
        initialProps: {
          region: testRegionCA,
          metric: MetricId.PI,
        },
        wrapper,
      }
    );

    // The catalog should have performed a data fetch, but since it's anync,
    // initially the hook won't return data.
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    expect(result.current.data).toStrictEqual(undefined);
    // Wait for initial async fetch to finish.
    await waitForNextUpdate();
    expect(result.current.data?.currentValue).toBe(Math.PI);

    // Render the hook again with a different metric.  This should perform a fetch.
    rerender({ region: testRegionCA, metric: MetricId.E });
    expect(catalog.dataFetchesCount).toBe(++expectedFetches);
    // Data should go back to loading state.
    expect(result.current.data).toStrictEqual(undefined);

    // Wait for async fetch to return the new data.
    await waitForNextUpdate();
    expect(result.current.data?.currentValue).toBe(Math.E);
  });
});

function createCatalogAndWrapper() {
  const catalog = new MetricCatalog(testMetricDefs, dataProviders);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MetricCatalogProvider metricCatalog={catalog}>
      {children}
    </MetricCatalogProvider>
  );
  return { catalog, wrapper };
}
