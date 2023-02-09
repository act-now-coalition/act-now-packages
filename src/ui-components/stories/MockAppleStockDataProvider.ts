import {
  Metric,
  MetricData,
  SimpleMetricDataProviderBase,
} from "../../metrics";
import { Region } from "../../regions";
import { validate } from "../../validate";
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
export class AppleStockDataProvider extends SimpleMetricDataProviderBase {
  constructor(providerId: string) {
    super(providerId);
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    const timeseries = appleStockTimeseries;

    // Use last value of timeseries as current value.
    validate(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
