import { Region } from "src/regions";

import { Metric } from "../Metric";
import type { MetricCatalog } from "../MetricCatalog";
import { MultiRegionMultiMetricDataStore } from "../data";

/**
 * Interface that all metric data providers must implement.
 *
 * A `MetricDataProvider` is used to fetch metric data from a particular source,
 * e.g. a CSV file or API endpoint.
 *
 * The {@link MetricCatalog} uses `MetricDataProvider`s to fetch metric data
 * based on the {@link MetricDataReference} in the {@link Metric}.
 */
export interface MetricDataProvider {
  /**
   * The unique id of this MetricDataProvider (e.g. "main-metrics-csv" or
   * "city-data-api"). This ID can be used from a {@link MetricDataReference}
   * to indicate what provider should be used to fetch the data for a metric.
   */
  readonly id: string;

  /**
   * Fetches all of the data for the specified regions and metrics, optionally
   * including timeseries metric data if available.
   *
   * @param regions One or more regions to fetch data for.
   * @param metrics One or more metrics to fetch data for.
   * @param includeTimeseries Whether to fetch timeseries data.
   * @param metricCatalog The metric catalog using this data provider.  The data
   * provider can call back into the catalog if it needs to fetch dependent
   * data.
   * @returns The fetched data for the specified regions and metrics.
   */
  fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean,
    metricCatalog: MetricCatalog
  ): Promise<MultiRegionMultiMetricDataStore>;
}
