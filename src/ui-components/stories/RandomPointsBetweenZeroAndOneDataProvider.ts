import {
  Metric,
  MetricData,
  SimpleMetricDataProviderBase,
} from "../../metrics";
import { Region } from "../../regions";
import { validate } from "../../validate";
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
    validate(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
