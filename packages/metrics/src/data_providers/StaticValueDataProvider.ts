import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";
import { Metric } from "../Metric";
import { Timeseries } from "../Timeseries";
import { MetricData } from "../data";

/**
 * Simple data provider that provides a static value for all regions. Mostly
 * only useful for testing.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "static",
 *   value: 42,
 * },
 * ```
 */
export class StaticValueDataProvider extends SimpleMetricDataProviderBase {
  /**
   * Constructs a new MockDataProvider instance.
   *
   * @param providerId A unique provider id to associate with the provider (e.g.
   * "static"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   */
  constructor(providerId: string) {
    super(providerId);
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): Promise<MetricData<unknown>> {
    const value = metric.dataReference?.value;
    assert(
      value !== undefined,
      `${metric} is missing a "value" in its "static-data" data reference.`
    );

    const timeseries = !includeTimeseries
      ? undefined
      : new Timeseries([
          {
            date: new Date("2022-01-02"),
            value,
          },
        ]);
    return new MetricData(metric, region, value, timeseries);
  }
}
