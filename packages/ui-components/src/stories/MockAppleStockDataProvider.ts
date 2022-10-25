import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import {
  CachingMetricDataProviderBase,
  MetricData,
  Metric,
} from "@actnowcoalition/metrics";
import { appleStockTimeseries } from "./mockData";

/**
 * Mock data provider with constant timeseries data for all regions. Useful
 * for charts and other components when we would like stable dates and
 * ranges of values.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "mock_apple_stock"
 * },
 * ```
 */
export class AppleStockDataProvider extends CachingMetricDataProviderBase {
  constructor(providerId: string) {
    super(providerId);
  }

  private cachedData: { [key: string]: MetricData<number> } = {};

  async populateCache(): Promise<void> {
    // We generate data on demand and then cache it (so that we return
    // consistent data if we're asked for it again), so we don't need to
    // populate any cache up front.
  }

  getDataFromCache(region: Region, metric: Metric): MetricData<unknown> {
    const timeseries = appleStockTimeseries;

    // Use last value of timeseries as current value.
    assert(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
