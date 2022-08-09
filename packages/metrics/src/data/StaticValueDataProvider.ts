import { Region } from "@actnowcoalition/regions";
import { assert } from "console";
import { Metric } from "../Metric/Metric";
import { Timeseries } from "../Timeseries";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { MetricData } from "./MetricData";

/**
 * Simple data provider that provides a static value for all regions. Mostly
 * only useful for testing.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "static-value",
 *   value: 42,
 * },
 * ```
 */
export class StaticValueDataProvider extends CachingMetricDataProviderBase {
  constructor() {
    super("static-value");
  }

  async populateCache(): Promise<void> {
    // No data necessary to cache.
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
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
