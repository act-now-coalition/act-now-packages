import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";
import { Metric } from "../Metric/Metric";
import { Timeseries } from "../Timeseries";
import { MetricLevel } from "../Metric/MetricLevel";

/**
 * Data for a particular region and metric, possibly including timeseries history.
 */
export class MetricData<T = unknown> {
  constructor(
    /** The metric this data is for. */
    readonly metric: Metric,
    /** The region this data is for. */
    readonly region: Region,
    /** The current value of the metric or null if there is no available metric value for this region. */
    readonly currentValue: T | null,
    private _timeseries?: Timeseries<T>
  ) {}

  /**
   * Checks if timeseries data is available.
   *
   * @returns True if timeseries data was fetched for this metric. False means
   * the metric is not timeseries-enabled or includeTimeseries was set to false
   * when fetching the data.
   */
  hasTimeseries(): boolean {
    return this._timeseries !== undefined;
  }

  /**
   * The timeseries data for this metric.
   *
   * Throws if timeseries data was not fetched for this metric. See {@link hasTimeseries}.
   */
  get timeseries(): Timeseries<T> {
    assert(
      this._timeseries,
      "Timeseries is not available. Either this metric is not timeseries-enabled or " +
        "includeTimeseries was set to false when fetching the metric data."
    );
    return this._timeseries;
  }

  /**
   * Returns the current value, but throws an error if it is null.
   */
  get currentValueStrict(): T {
    assert(
      this.currentValue !== null,
      "currentValueString called when currentValue is null."
    );
    return this.currentValue;
  }

  /**
   * Ensures the timeseries data is numeric and returns it.
   *
   * @returns The timeseries cast to `Timeseries<number>`.
   */
  numericTimeseries(): Timeseries<number> {
    return this.timeseries.removeNils().assertFiniteNumbers();
  }

  /**
   * Ensures the metric data is numeric.
   *
   * @returns This `MetricData` cast to `MetricData<number>`.
   */
  assertFiniteNumbers(): MetricData<number> {
    assert(
      this.currentValue !== null &&
        typeof this.currentValue === "number" &&
        isFinite(this.currentValue),
      `Value is not numeric: ${this.currentValue}`
    );

    const timeseries = this._timeseries?.assertFiniteNumbers();

    return new MetricData(
      this.metric,
      this.region,
      this.currentValue as number,
      timeseries
    );
  }

  /**
   * Uses this metric's grading logic (thresholds and levels) to grade the
   * `currentValue` to a `MetricLevel`.
   *
   * @returns The level that the value falls into.
   */
  getLevel(): MetricLevel {
    return this.metric.getLevel(this.currentValue);
  }

  /**
   * Formats the metric value for display purposes, using this metric's formatting logic.
   *
   * @param nullValueCopy Optional copy to be used if the value is null, else an empty string will be used.
   * @returns The formatted value.
   */
  formatValue(nullValueCopy = ""): string {
    return this.metric.formatValue(this.currentValue, nullValueCopy);
  }

  /**
   * Rounds the metric value to the appropriate number of significant digits
   * based on this metric's formatting logic.
   *
   * @returns Rounded value.
   */
  roundValue(): number | null {
    return this.metric.roundValue(this.currentValue);
  }
}
