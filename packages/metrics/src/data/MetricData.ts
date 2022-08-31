import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";

import { Metric, MetricLevel } from "../Metric";
import { Timeseries } from "../Timeseries";
import { parseBoolean } from "./data_utils";

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
   * Removes timeseries data for this metric.
   *
   * @returns new MetricData object without timeseries data.
   */
  dropTimeseries(): MetricData<T> {
    return new MetricData(this.metric, this.region, this.currentValue);
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
   * Ensures the metric data is boolean.
   *
   * Only strictly-boolean values are allowed (true, false).
   * Use convertToBoolean() to coerce near-boolean values to boolean (e.g. "yes", 1, "True")
   *
   * @returns This `MetricData` cast to `MetricData<boolean>`.
   */
  assertBoolean(): MetricData<boolean> {
    assert(
      this.currentValue === null || typeof this.currentValue === "boolean",
      `Value is not boolean: ${this.currentValue}`
    );
    const timeseries = this._timeseries?.assertBoolean();
    return new MetricData(
      this.metric,
      this.region,
      this.currentValue as boolean,
      timeseries
    );
  }

  /**
   * Converts near-boolean metric data (e.g. "yes", "True", 1) to boolean.
   *
   * Throws an error if any data is not coercible to a boolean.
   *
   * @returns This `MetricData` with its data coerced to boolean, and cast to `MetricData<boolean>`
   */
  convertToBoolean(): MetricData<boolean> {
    const currentValueBoolean = parseBoolean(this.currentValue);
    const booleanTimeseries = this._timeseries?.mapValues(parseBoolean);
    return new MetricData(
      this.metric,
      this.region,
      currentValueBoolean,
      booleanTimeseries
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

  /**
   * Uses this metric's grading logic or categories to color the `currentValue`.
   *
   * @returns The color associated with the metric's value.
   */
  getColor(): string {
    return this.metric.getColor(this.currentValue);
  }
}
