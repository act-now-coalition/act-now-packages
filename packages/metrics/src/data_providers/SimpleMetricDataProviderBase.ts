import { Region } from "@actnowcoalition/regions";

import { MetricDataProvider } from "./MetricDataProvider";
import { Metric } from "../Metric";
import { MetricData, MultiRegionMultiMetricDataStore } from "../data";
import { MetricCatalog } from "../MetricCatalog";

/**
 * Base class to help implement a MetricDataProvider that fetches one
 * region and metric at a time. To support fetching multiple regions
 * and metrics simultaneously, implement MetricDataProvider directly.
 */
export abstract class SimpleMetricDataProviderBase
  implements MetricDataProvider
{
  /**
   * @param id A unique provider id to associate with the provider (e.g.
   * "mock"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   */
  constructor(readonly id: string) {}

  /**
   * Method to be overridden by subclasses to fetch the specified MetricData.
   *
   * @param region The region to get data for.
   * @param metric The metric to get data for.
   * @param includeTimeseries Whether to get timeseries data.
   * @param metricCatalog The metric catalog using this data provider.  The data
   * provider can call back into the catalog if it needs to fetch dependent
   * data.
   * @returns The `MetricData` for the given `metric` and `region`.
   */
  abstract fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean,
    metricCatalog: MetricCatalog
  ): Promise<MetricData>;

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean,
    metricCatalog: MetricCatalog
  ): Promise<MultiRegionMultiMetricDataStore> {
    return MultiRegionMultiMetricDataStore.fromRegionsAndMetricsAsync(
      regions,
      metrics,
      (region, metric) =>
        this.fetchDataForRegionAndMetric(
          region,
          metric,
          includeTimeseries,
          metricCatalog
        )
    );
  }
}
