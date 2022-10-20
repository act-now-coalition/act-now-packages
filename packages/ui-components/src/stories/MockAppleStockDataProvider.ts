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
export class MockAppleStockDataProvider extends CachingMetricDataProviderBase {
  constructor() {
    super(/*providerId=*/ "mock_apple_stock");
  }

  private cachedData: { [key: string]: MetricData<number> } = {};

  async populateCache(): Promise<void> {
    // We generate data on demand and then cache it (so that we return
    // consistent data if we're asked for it again), so we don't need to
    // populate any cache up front.
  }

  getDataFromCache(region: Region, metric: Metric): MetricData<unknown> {
    const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
    if (!this.cachedData[cacheKey]) {
      const timeseries = appleStockTimeseries;

      // Use last value of timeseries as current value.
      assert(timeseries.hasData());
      const currentValue = timeseries.last.value;

      this.cachedData[cacheKey] = new MetricData(
        metric,
        region,
        currentValue,
        timeseries
      );
    }

    return this.cachedData[cacheKey];
  }
}
