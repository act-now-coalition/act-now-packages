import { assert } from "@actnowcoalition/assert";
import {
  Metric,
  MetricData,
  SimpleMetricDataProviderBase,
} from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { randomPointsBetweenZeroAndOneTimeseries } from "./mockData";

/**
 * Mock data provider with random points between zero and one.
 * Useful for charts illustrating decimal points or percentage values.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "random_points_between_zero_and_one"
 * },
 * ```
 */
export class RandomPointsBetweenZeroAndOneDataProvider extends SimpleMetricDataProviderBase {
  constructor(providerId: string) {
    super(providerId);
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    const timeseries = randomPointsBetweenZeroAndOneTimeseries;

    // Use last value of timeseries as current value.
    assert(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
