import mapValues from "lodash/mapValues";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { Metric } from "../Metric/Metric";
import { MetricData } from "./MetricData";
import { MultiMetricDataStore } from "./MultiMetricDataStore";

/**
 * A metric data store containing data for multiple regions and multiple metrics.
 *
 * Useful when fetching / storing a bunch of metrics that a single component
 * needs.
 */
export class MultiRegionMultiMetricDataStore<T = unknown> {
  constructor(
    readonly data: {
      [regionId: string]: MultiMetricDataStore<T>;
    }
  ) {}

  /**
   * Gets all metric data for a given region.
   *
   * @param region The region to get data for.
   * @returns A MultiMetricDataStore containing all metrics for the given region.
   */
  regionData(region: Region): MultiMetricDataStore<T> {
    const regionId = region.regionId;
    const multiMetricDataStore = this.data[regionId];
    assert(
      multiMetricDataStore,
      `No data for region ${regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`
    );
    return multiMetricDataStore;
  }

  /**
   * Gets the metric data for a given region and metric.
   * @param region The region to get data for.
   * @param metric The metric to get data for.
   * @returns The metric data.
   */
  metricData(region: Region, metric: Metric | string): MetricData<T> {
    return this.regionData(region).metricData(metric);
  }

  /**
   * Throws an exception if any values for any metrics for any regions are not
   * finite numbers (e.g. strings, null, undefined, infinity, NaN).
   *
   * The returned data store will be cast to `MultiRegionMultiMetricDataStore<number>` so
   * any subsequent code doesn't need to deal with non-number values.
   * @returns
   */
  assertFiniteNumbers(): MultiRegionMultiMetricDataStore<number> {
    const regionToMultiMetricDataStoreMap = mapValues(
      this.data,
      (multiMetricDataStore) => multiMetricDataStore.assertFiniteNumbers()
    );
    return new MultiRegionMultiMetricDataStore(regionToMultiMetricDataStoreMap);
  }
}
