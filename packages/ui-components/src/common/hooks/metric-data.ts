import { Region } from "@actnowcoalition/regions";
import {
  Metric,
  MetricData,
  MultiMetricDataStore,
  MultiRegionMultiMetricDataStore,
} from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../../components/MetricCatalogContext";
import { useCallback, useEffect, useState } from "react";
import { useCachedArrayIfEqual } from "./useCachedArrayIfEqual";

/**
 * Used as the result of a React hook in order to represent one of three states:
 *
 * 1. The data is loading. (data and error are both nil)
 * 2. The data is loaded. (data is not nil, error is nil)
 * 3. The data failed to load. (data is nil, error is not nil)
 */
export type DataOrError<T> = { data?: T; error?: Error };

/**
 * React hook to use data for a given `region` and `metric`.
 *
 * @param region The region to get data for.
 * @param metric The metric to get data for as either a string or `Metric` object.
 * @param includeTimeseries Whether to fetch timeseries data or not (default false).
 * @returns The metric data.
 */
export function useData(
  region: Region,
  metric: string | Metric,
  includeTimeseries = false
): DataOrError<MetricData> {
  const catalog = useMetricCatalog();

  const fetchData = useCallback(() => {
    return catalog.fetchData(region, metric, includeTimeseries);
  }, [catalog, region, metric, includeTimeseries]);

  return useFetchedData(fetchData);
}

/**
 * React hook to use data for a given `region` and multiple `metrics`.
 *
 * @param region The region to get data for.
 * @param metrics The metrics to get data for as either strings or `Metric` objects.
 * @param includeTimeseries Whether to fetch timeseries data or not (default false).
 * @returns The metric data.
 */
export function useDataForMetrics(
  region: Region,
  metrics: Array<string | Metric>,
  includeTimeseries = false
): DataOrError<MultiMetricDataStore> {
  const catalog = useMetricCatalog();
  let resolvedMetrics = metrics.map((m) => catalog.getMetric(m));

  // In order to allow people to pass in a new array of metrics that
  // contain the same metrics as before without triggering additional
  // fetches, we need this caching trick.
  resolvedMetrics = useCachedArrayIfEqual(resolvedMetrics);
  const fetchData = useCallback(() => {
    return catalog.fetchDataForMetrics(
      region,
      resolvedMetrics,
      includeTimeseries
    );
  }, [catalog, region, resolvedMetrics, includeTimeseries]);

  return useFetchedData(fetchData);
}

/**
 * React hook to use data for multiple `regions` and multiple `metrics`.
 *
 * @param regions The regions to get data for.
 * @param metrics The metrics to get data for as either strings or `Metric` objects.
 * @param includeTimeseries Whether to fetch timeseries data or not (default false).
 * @returns The metric data.
 */
export function useDataForRegionsAndMetrics(
  regions: Region[],
  metrics: Array<string | Metric>,
  includeTimeseries = false
): DataOrError<MultiRegionMultiMetricDataStore> {
  const catalog = useMetricCatalog();
  let resolvedMetrics = metrics.map((m) => catalog.getMetric(m));

  // In order to allow people to pass in a new array of regions / metrics that
  // contain the same regions / metrics as before without triggering additional
  // fetches, we need this caching trick.
  resolvedMetrics = useCachedArrayIfEqual(resolvedMetrics);
  regions = useCachedArrayIfEqual(regions);
  const fetchData = useCallback(() => {
    return catalog.fetchDataForRegionsAndMetrics(
      regions,
      resolvedMetrics,
      includeTimeseries
    );
  }, [catalog, regions, resolvedMetrics, includeTimeseries]);

  return useFetchedData(fetchData);
}

/**
 * Helper to implement the useData*() hooks. It calls the provided fetchData()
 * callback that returns a Promise and uses the result of the promise to
 * populate the DataOrError result once the promise completes.
 */
function useFetchedData<T>(fetchData: () => Promise<T>): DataOrError<T> {
  const [data, setData] = useState<T>();

  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error(`Error fetching metric data: ${error}`);
        return { error };
      });
  }, [fetchData]);
  return { data };
}
