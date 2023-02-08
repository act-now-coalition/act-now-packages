import {
  Metric,
  MetricData,
  SimpleMetricDataProviderBase,
} from "../../metrics";
import { Region } from "../../regions";
import { validate } from "../../validate";
import { nycTemperatureTimeseries } from "./mockData";

/**
 * Data provider that provides NYC temperature data for all regions.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "nyc_temperature"
 * },
 * ```
 */
export class NycTemperatureDataProvider extends SimpleMetricDataProviderBase {
  constructor(providerId: string) {
    super(providerId);
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    const timeseries = nycTemperatureTimeseries;

    // Use last value of timeseries as current value.
    validate(timeseries.hasData());
    const currentValue = timeseries.last.value;

    return new MetricData(metric, region, currentValue, timeseries);
  }
}
