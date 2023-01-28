import truncate from "lodash/truncate";
import {
  Metric,
  MetricData,
  MultiMetricDataStore,
  MultiRegionMultiMetricDataStore,
} from "src/metrics";
import { Region } from "src/regions";
import useSWR, { Fetcher, Key, SWRResponse } from "swr";

import { useMetricCatalog } from "../../components/MetricCatalogContext";

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
  const args = { region, metric, includeTimeseries };

  const fetcher = ({ region, metric, includeTimeseries }: typeof args) => {
    return catalog.fetchData(region, metric, includeTimeseries);
  };

  return useSWRWrapper(
    args,
    fetcher,
    `useData(region=${region}, metric=${metric})`
  );
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
  const args = { region, metrics, includeTimeseries };

  const fetcher = ({ region, metrics, includeTimeseries }: typeof args) => {
    return catalog.fetchDataForMetrics(region, metrics, includeTimeseries);
  };

  return useSWRWrapper(
    args,
    fetcher,
    `useDataForMetrics(region=${region}, metrics=${metrics})`
  );
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
  const args = { regions, metrics, includeTimeseries };
  const fetcher = ({ regions, metrics, includeTimeseries }: typeof args) => {
    return catalog.fetchDataForRegionsAndMetrics(
      regions,
      metrics,
      includeTimeseries
    );
  };

  return useSWRWrapper(
    args,
    fetcher,
    `useDataForRegionsAndMetrics(regions=${truncate(regions.toString(), {
      length: 100,
    })}, metrics=${metrics})`
  );
}

/** Wrapper that logs errors and disables caching. */
function useSWRWrapper<Data = any, Error = any, SWRKey extends Key = null>(
  key: SWRKey,
  fetcher: Fetcher<Data, SWRKey> | null,
  errorContextString: string
): SWRResponse<Data, Error> {
  const result = useSWR(key, fetcher);
  // We do metric data caching internally in the metric data providers, so we
  // don't need SWR's caching. We bypass it here (by not returning the data
  // until it's been validated) so that e.g. we can use the `delayMs` feature of
  // the MockMetricDataProvider and actually see a visible effect (by default
  // SWR would just show the cached contents while the delay is in effect).
  if (result.isValidating) {
    return { ...result, data: undefined };
  }

  // Log any errors so they don't accidentally get ignored by the developer.
  if (result.error) {
    console.error(`${errorContextString} failed: ${result.error}`);
  }
  return result;
}
