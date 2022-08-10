import { Region } from "@actnowcoalition/regions";

import { Metric } from "../Metric/Metric";
import { MultiRegionMultiMetricDataStore } from "../data/MultiRegionMultiMetricDataStore";

/**
 * Base class for metric data providers.
 *
 * A `MetricDataProvider` can be used to fetch metric data from a particular
 * source, e.g. a CSV file or API endpoint.
 *
 * The {@link MetricCatalog} uses `MetricDataProvider`s to fetch metric data
 * based on the {@link MetricDataReference} in the {@link Metric}.
 */
export abstract class MetricDataProvider {
  constructor(
    /**
     * The unique id of this MetricDataProvider (e.g. "main-metrics-csv" or
     * "city-data-api"). This ID can be used from a {@link MetricDataReference}
     * to indicate what provider should be used to fetch the data for a metric.
     */
    readonly id: string
  ) {}

  /**
   * Fetches all of the data for the specified regions and metrics, optionally
   * including timeseries metric data if available.
   *
   * @param regions One or more regions to fetch data for.
   * @param metrics One or more metrics to fetch data for.
   * @param includeTimeseries Whether to fetch timeseries data.
   */
  abstract fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<MultiRegionMultiMetricDataStore>;
}
