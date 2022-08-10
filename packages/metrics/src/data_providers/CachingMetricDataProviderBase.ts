import { Region } from "@actnowcoalition/regions";

import { MetricDataProvider } from "./MetricDataProvider";
import { Metric } from "../Metric/Metric";
import { MetricData } from "../data/MetricData";
import { MultiMetricDataStore } from "../data/MultiMetricDataStore";
import { MultiRegionMultiMetricDataStore } from "../data/MultiRegionMultiMetricDataStore";

/**
 * Base class to help implement a MetricDataProvider that caches data.  It doesn't
 * handle the actual caching, but provides a common interface for subclasses to do so
 * and reduces the amount of boilerplate code needed.
 */
export abstract class CachingMetricDataProviderBase extends MetricDataProvider {
  constructor(id: string) {
    super(id);
  }

  /**
   * Method to be overridden by subclasses to populate the cache with metric
   * data for a given set of regions and metrics.
   *
   * It will be called multiple times, perhaps with the same set of regions or
   * metrics, so the subclass must keep track of what is in the cache or not if
   * it needs to do so.
   *
   * That said, a naive implementation might just cache everything the first time
   * it's called (regardless of specified regions / metrics) so that the cache
   * is fully populated.
   *
   * @param regions The set of regions to populate the cache with.
   * @param metrics The set of metrics to populate the cache with.
   * @param includeTimeseries Whether to include timeseries data.
   */
  abstract populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<void>;

  /**
   * Method to be overridden by subclasses to get the specified MetricData from the cache.  This
   * will always be called after a call to `populateCache` has been made that included the given
   * `metric` and `region`.
   *
   * @param region The region to get data for.
   * @param metric The metric to get data for.
   * @param includeTimeseries Whether to get timeseries data.
   * @returns The `MetricData` for the given `metric` and `region`.
   */
  abstract getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData;

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<MultiRegionMultiMetricDataStore> {
    await this.populateCache(regions, metrics, includeTimeseries);

    const data: { [regionId: string]: MultiMetricDataStore } = {};
    for (const region of regions) {
      const regionData: { [metricId: string]: MetricData } = {};
      for (const metric of metrics) {
        regionData[metric.id] = this.getDataFromCache(
          region,
          metric,
          includeTimeseries
        );
      }
      data[region.regionId] = new MultiMetricDataStore(region, regionData);
    }

    return new MultiRegionMultiMetricDataStore(data);
  }
}
