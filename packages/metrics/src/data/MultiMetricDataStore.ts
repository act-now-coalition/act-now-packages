import mapValues from "lodash/mapValues";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { Metric } from "../Metric/Metric";
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
    readonly metricToDataMap: MetricToDataMap<T>
  ) {}

  /**
   * Gets the MetricData for a particular metric.
   *
   * @param metric The metric to get data for.
   * @returns The MetricData for the metric.
   */
  metricData(metric: string | Metric): MetricData<T> {
    const metricId = metric instanceof Metric ? metric.id : metric;
    const data = this.metricToDataMap[metricId];
    assert(
      data,
      `No data for metric ${metricId}. Did you forget to specify it when you created the MetricDataStore?`
    );
    return data;
  }

  /**
   * Ensures the data for all metrics is numeric.
   *
   * @returns This `MultiMetricDataStore` cast to `MultiMetricDataStore<number>`.
   */
  assertFiniteNumbers(): MultiMetricDataStore<number> {
    const metricToDataMap = mapValues(this.metricToDataMap, (data) =>
      data.assertFiniteNumbers()
    );
    return new MultiMetricDataStore(this.region, metricToDataMap);
  }
}
