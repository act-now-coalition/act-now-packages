import delay from "delay";

import { Region } from "../../regions";
import { TimeUnit, getTimeDiff } from "../../time-utils";
import { validate } from "../../validate";
import { Metric } from "../Metric";
import { mockTimeseries } from "../Timeseries";
import { MetricData } from "../data";
import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";

/**
 * Fields allowed in the { @link MetricDefinition.dataReference } of metrics using the
 * MockDataProvider.
 */
export interface MockDataReferenceFields {
  /** A minimum value for the generated mock data. */
  minValue?: number;
  /** A maximum value for the generated mock data. */
  maxValue?: number;
  /** Start date for generated timeseries data. */
  startDate?: string;
  /** End date for generated timeseries data. */
  endDate?: string;
  /**
   * A delay (in milliseconds) to pause before returning data. Used to simulate
   * a network delay.
   */
  delayMs?: number;
  /**
   * An error message to return instead of fetching / returning any data. Used
   * to test component error handling.
   */
  error?: string;
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
export class MockDataProvider extends SimpleMetricDataProviderBase {
  /**
   * Constructs a new MockDataProvider instance.
   *
   * @param providerId A unique provider id to associate with the provider (e.g.
   * "mock"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   */
  constructor(providerId: string) {
    super(providerId);
  }

  private cachedData: { [key: string]: MetricData<number> } = {};

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
    const fields = metric.dataReference as MockDataReferenceFields;
    if (!this.cachedData[cacheKey]) {
      const minValue = fields.minValue ?? 0;
      const maxValue = fields.maxValue ?? 100;
      const startDate = new Date(fields.startDate ?? "2022-01-01");
      const endDate = fields.endDate
        ? new Date(fields.endDate)
        : new Date(new Date().toISOString().replace(/T.*/, ""));
      const dataLength = getTimeDiff(endDate, startDate, TimeUnit.DAYS) + 1;
      validate(dataLength >= 0, "endDate must be >= startDate.");

      // NOTE: We always include the timeseries even if not asked so that we end up
      // with it in the cache in case they want timeseries later.
      const timeseries = mockTimeseries(
        dataLength,
        minValue,
        maxValue,
        startDate,
        endDate
      );

      // Use last value of timeseries as current value.
      validate(timeseries.hasData());
      const currentValue = timeseries.last.value;

      this.cachedData[cacheKey] = new MetricData(
        metric,
        region,
        currentValue,
        timeseries
      );
    }

    if (fields.delayMs) {
      await delay(fields.delayMs);
    }

    if (fields.error) {
      throw new Error(fields.error);
    }

    return this.cachedData[cacheKey];
  }
}
