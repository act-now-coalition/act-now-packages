import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import mapValues from "lodash/mapValues";

import { Metric } from "../Metric";
import { MetricData } from "./MetricData";

export interface MetricToDataMap<T> {
  [id: string]: MetricData<T>;
}

/**
 * A metric data store containing data for multiple metrics for a single region.
 *
 * Useful when fetching / storing a bunch of metrics that a single component
 * needs.
 */
export class MultiMetricDataStore<T = unknown> {
  constructor(
    /** The region for which we have stored metrics. */
    readonly region: Region,
    private data: MetricToDataMap<T>
  ) {}

  /** Whether this data store is empty. */
  get isEmpty(): boolean {
    return Object.keys(this.data).length === 0;
  }

  /**
   * Returns the `MetricData` for every metric in the data store.
   */
  get all(): MetricData[] {
    return Object.values(this.data);
  }

  /**
   * Gets the MetricData for a particular metric.
   *
   * @param metric The metric to get data for.
   * @returns The MetricData for the metric.
   */
  metricData(metric: string | Metric): MetricData<T> {
    const metricId = metric instanceof Metric ? metric.id : metric;
    const data = this.data[metricId];
    assert(
      data,
      `No data for metric ${metricId}. Did you forget to specify it when you created the MetricDataStore?`
    );
    return data;
  }

  /**
   * Checks whether this data store contains data for the given metric.
   *
   * @param metric The metric to check for data for.
   * @returns Whether this data store contains data for the given metric.
   */
  hasMetricData(metric: Metric | string): boolean {
    const metricId = metric instanceof Metric ? metric.id : metric;
    return this.data[metricId] !== undefined;
  }

  /**
   * Ensures the data for all metrics is numeric.
   *
   * @returns This `MultiMetricDataStore` cast to `MultiMetricDataStore<number>`.
   */
  assertFiniteNumbers(): MultiMetricDataStore<number> {
    const metricToDataMap = mapValues(this.data, (data) =>
      data.assertFiniteNumbers()
    );
    return new MultiMetricDataStore(this.region, metricToDataMap);
  }

  /**
   * Merges the provided data store into this one and returns the result.
   *
   * Data from the provided data store takes precedence over any existing data.
   *
   * @param other The data store to merge into this one.
   * @returns The merged data store.
   */
  merge(other: MultiMetricDataStore<T>): MultiMetricDataStore<T> {
    const data: MetricToDataMap<T> = { ...this.data, ...other.data };
    return new MultiMetricDataStore(this.region, data);
  }

  /**
   * Removes timeseries data for all metrics.
   *
   * @returns new MultiMetricDataStore object without timeseries data.
   */
  dropTimeseries(): MultiMetricDataStore<T> {
    return new MultiMetricDataStore(
      this.region,
      mapValues(this.data, (metricData) => metricData.dropTimeseries())
    );
  }
}
