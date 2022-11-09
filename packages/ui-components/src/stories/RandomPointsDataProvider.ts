import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import {
  SimpleMetricDataProviderBase,
  MetricData,
  Metric,
} from "@actnowcoalition/metrics";
import { randomPointsTimeseries } from "./mockData";

/**
 * Mock data provider with constant timeseries data for all regions. Useful
 * for charts and other components when we would like stable dates and
 * ranges of values.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "random_points"
 * },
 * ```
 */
export class RandomPointsDataProvider extends SimpleMetricDataProviderBase {
  constructor(providerId: string) {
    super(providerId);
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    const timeseries = randomPointsTimeseries;

    // Use last value of timeseries as current value.
    assert(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
