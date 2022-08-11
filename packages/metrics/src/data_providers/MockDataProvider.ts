import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { getTimeDiff, TimeUnit } from "@actnowcoalition/time-utils";

import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { MetricData } from "../data";
import { Metric } from "../Metric";
import { Timeseries } from "../Timeseries";

/**
 * Fields allowed in the { @link MetricDefinition.dataReference } of metrics using the
 * "mock" data provider.
 */
export interface MockDataReferenceFields {
  minValue?: number;
  maxValue?: number;
  startDate?: string;
  endDate?: string;
}

/**
 * Simple mock data provider that provides mock data for all regions. Mostly
 * only useful for testing / demos.
 *
 * @example
 * ```
 * dataReference: {
 *   providerId: "mock",
 *   minValue: 0,
 *   maxValue: 100,
 *   startDate: "2022-01-02",
 *   endDate: "2022-06-01",
 * },
 * ```
 */
export class MockDataProvider extends CachingMetricDataProviderBase {
  constructor() {
    super("mock");
  }

  private cachedData: { [key: string]: MetricData<number> } = {};

  async populateCache(): Promise<void> {
    // We generate data on demand and then cache it (so that we return
    // consistent data if we're asked for it again), so we don't need to
    // populate any cache up front.
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
    if (!this.cachedData[cacheKey]) {
      const fields = metric.dataReference as MockDataReferenceFields;
      const minValue = fields.minValue ?? 0;
      const maxValue = fields.maxValue ?? 100;
      const startDate = new Date(fields.startDate ?? "2022-01-01");
      const endDate = fields.endDate
        ? new Date(fields.endDate)
        : new Date(new Date().toISOString().replace(/T.*/, ""));
      const dataLength = getTimeDiff(endDate, startDate, TimeUnit.DAYS) + 1;
      assert(dataLength >= 0, "endDate must be >= startDate.");

      let currentValue: number;
      let timeseries: Timeseries<number> | undefined;
      if (includeTimeseries) {
        timeseries = mockTimeseries(
          dataLength,
          minValue,
          maxValue,
          startDate,
          endDate
        );
        // Use last value of timeseries as current value.
        assert(timeseries.hasData());
        currentValue = timeseries.last.value;
      } else {
        // No timeseries. Just generate a random value.
        currentValue = Math.random() * (maxValue - minValue) + minValue;
      }

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

/**
 * Generates a timeseries using a sine wave with random magnitude and phase.
 */
function mockTimeseries(
  dataLength: number,
  minValue: number,
  maxValue: number,
  startDate: Date,
  endDate: Date
) {
  const range = maxValue - minValue;
  const midpoint = minValue + range / 2;
  const magnitude = (range * Math.random()) / 2;
  const phase = Math.random() * Math.PI * 2;
  const radiansPerDay = (Math.PI * 2) / dataLength;

  const values: number[] = [];
  for (let i = 0; i < dataLength; i++) {
    values[i] =
      midpoint + Math.sin(radiansPerDay * i + phase) * magnitude + minValue;
  }

  return Timeseries.fromDateRange(startDate, endDate, (date, i) => values[i]);
}
