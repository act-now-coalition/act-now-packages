import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";

import { Metric, MetricLevel } from "../Metric";
import { Timeseries } from "../Timeseries";

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
   * Removes any empty (null) values from the timeseries, Ensures the remaining
   * data is numeric,  and returns a new `Timeseries<number>` with the data.
   *
   * @returns The timeseries cast to `Timeseries<number>`.
   */
  numericTimeseries(): Timeseries<number> {
    return this.timeseries.removeNils().assertFiniteNumbers();
  }

  /**
   * Ensures the metric data is numeric.
   *
   * Null values are treated as finite and will not throw an error.
   *
   * @returns This `MetricData` cast to `MetricData<number>`.
   */
  assertFiniteNumbers(): MetricData<number> {
    assert(
      this.currentValue === null ||
        (typeof this.currentValue === "number" && isFinite(this.currentValue)),
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
   * Ensures the metric data is of type string.
   *
   * Null values are treated as strings and will not throw an error.
   *
   * @returns This `MetricData` cast to `MetricData<string>`.
   */
  assertStrings(): MetricData<string> {
    assert(
      this.currentValue === null || typeof this.currentValue === "string",
      `Value is not a string: ${this.currentValue}`
    );

    const timeseries = this._timeseries?.assertStrings();

    return new MetricData(
      this.metric,
      this.region,
      this.currentValue as string,
      timeseries
    );
  }

  /**
   * Converts metric data to strings.
   *
   * Null values are preserved and are not converted to string.
   *
   * @returns This `MetricData` with its data converted to strings, and cast to `MetricData<string>`
   */
  convertToString(): MetricData<string> {
    const toStringPreserveNull = (value: unknown) =>
      value === null ? (null as unknown as string) : String(value);
    const currentValueStr = toStringPreserveNull(this.currentValue);
    const booleanTimeseries = this._timeseries?.mapValues(toStringPreserveNull);
    return new MetricData(
      this.metric,
      this.region,
      currentValueStr as string,
      booleanTimeseries
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
