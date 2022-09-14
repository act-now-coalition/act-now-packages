import { Region } from "@actnowcoalition/regions";
import {
  Metric,
  MetricCatalog,
  MetricData,
  MultiMetricDataStore,
  MultiRegionMultiMetricDataStore,
} from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../../components/MetricCatalogContext";
import { useEffect, useState } from "react";
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
 * @param includeTimeseries Whether to fetch timeseries data or not.
 * @returns The metric data.
 */
export function useData(
  region: Region,
  metric: string | Metric,
  includeTimeseries = true
): DataOrError<MetricData> {
  const { data: dataStore, error } = useDataForMetrics(
    region,
    [metric],
    includeTimeseries
  );
  const data = dataStore?.metricData(metric);
  return { data, error };
}

/**
 * React hook to use data for a given `region` and multiple `metrics`.
 *
 * @param region The region to get data for.
 * @param metrics The metrics to get data for as either strings or `Metric` objects.
 * @param includeTimeseries Whether to fetch timeseries data or not.
 * @returns The metric data.
 */
export function useDataForMetrics(
  region: Region,
  metrics: Array<string | Metric>,
  includeTimeseries = true
): DataOrError<MultiMetricDataStore> {
  const { data: dataStore, error } = useDataForRegionsAndMetrics(
    [region],
    metrics,
    includeTimeseries
  );
  const data = dataStore?.regionData(region);
  return { data, error };
}

/**
 * React hook to use data for multiple `regions` and multiple `metrics`.
 *
 * @param regions The regions to get data for.
 * @param metrics The metrics to get data for as either strings or `Metric` objects.
 * @param includeTimeseries Whether to fetch timeseries data or not.
 * @param optCatalog Optional metric catalog to use. If not provided, the
 * catalog is fetched via useMetricCatalog().
 * @returns The metric data.
 */
export function useDataForRegionsAndMetrics(
  regions: Region[],
  metrics: Array<string | Metric>,
  includeTimeseries = true,
  optCatalog?: MetricCatalog
): DataOrError<MultiRegionMultiMetricDataStore> {
  // HACK: optCatalog should override the context catalog, but
  // react-hooks/rules-of-hooks won't let us skip calling useMetricCatalog(), so
  // we call it regardless.
  let catalog = useMetricCatalog();
  catalog = optCatalog ?? catalog;
  const [data, setData] = useState<MultiRegionMultiMetricDataStore>();
  let resolvedMetrics = metrics.map((m) => catalog.getMetric(m));

  // In order to allow people to pass in a new array of regions / metrics that
  // contain the same regions / metrics as before without triggering additional
  // fetches, we need this caching trick.
  resolvedMetrics = useCachedArrayIfEqual(resolvedMetrics);
  regions = useCachedArrayIfEqual(regions);

  useEffect(() => {
    catalog
      .fetchDataForRegionsAndMetrics(
        regions,
        resolvedMetrics,
        includeTimeseries
      )
      .then((multiRegionMetricDataStore) => {
        setData(multiRegionMetricDataStore);
      })
      .catch((error) => {
        console.error(`Error fetching metric data: ${error}`);
        return { error };
      });
  }, [catalog, resolvedMetrics, regions, includeTimeseries]);
  return { data };
}
