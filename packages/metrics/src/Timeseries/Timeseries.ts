import first from "lodash/first";
import isNil from "lodash/isNil";
import last from "lodash/last";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import sumBy from "lodash/sumBy";

import { assert } from "@actnowcoalition/assert";
import { isFinite } from "@actnowcoalition/number-format";
import { PureDate, isoDateOnlyString } from "@actnowcoalition/time-utils";

/** A single, serialized point in a timeseries containing a date-string and a value. */
export interface TimeseriesPointJSON {
  date: string;
  value: unknown;
}

/**
 * A window of points from a timeseries, represented as a new timeseries.
 * Returned by {@link Timeseries#windowed}.
 */
export interface TimeseriesWindow<T> {
  /** The starting date of the window. */
  startDate: Date;
  /** The ending date of the window. */
  endDate: Date;
  /** The number of days in window (endDate - startDate). */
  days: number;
  /** The points in the window, represented as a new timeseries. */
  windowTimeseries: Timeseries<T>;
}

/**
 * A single point in a timeseries containing a date (which must not contain a
 * timestamp) and a value of type T.
 */
export interface TimeseriesPoint<T = unknown> {
  /** The date represented by this point. */
  get date(): Date;

  /** The value represented by this point. */
  get value(): T;
}

/** Represents a range of dates with either inclusive or exclusive endpoints. */
export type DateRange = {
  /** Optional starting date (inclusive) */
  startAt?: Date;

  /** Optional starting date (exclusive) */
  startAfter?: Date;

  /** Optional ending date (inclusive) */
  endAt?: Date;

  /** Optional ending date (exclusive) */
  endBefore?: Date;
};

/**
 * An immutable series of dates and values, representing a value that changes
 * over time.
 */
export class Timeseries<T = NonNullable<unknown>> {
  readonly points: Array<TimeseriesPoint<T>>;

  constructor(points: Array<TimeseriesPoint<T>>) {
    Timeseries.assertDatesHaveNoTimeComponent(points);
    Timeseries.assertPointsHaveNoNils(points);

    // Sort the points by date.
    this.points = points
      .slice()
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Static constructor to help create a timeseries from a range of dates and
   * some values.
   *
   * @param start The start date of the timeseries.
   * @param end The end date of the timeseries.
   * @param valueProvider An array of values or iteratee function that returns
   * values for the dates in the date range.
   * @returns A new timeseries.
   */
  static fromDateRange<T>(
    startDate: Date,
    endDate: Date,
    valueProvider: T[] | ((date: Date, index: number) => T)
  ): Timeseries<T> {
    const valueFn = Array.isArray(valueProvider)
      ? (date: Date, index: number) => valueProvider[index]
      : valueProvider;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const points = [];
    let index = 0;
    const date = start;
    while (date <= end) {
      points.push({
        // Clone the date since we're going to mutate it below.
        date: new Date(date),
        value: valueFn(date, index),
      });
      index++;
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return new Timeseries<T>(points);
  }

  /** The length of the timeseries. */
  get length(): number {
    return this.points.length;
  }

  /**
   * Returns whether the timeseries has any data.
   *
   * You can use this method as a type guard before calling last() or
   * findNearestDate() to ensure last() won't return undefined.
   * See {@link NonEmptyTimeseries} for details.
   */
  hasData(): this is NonEmptyTimeseries<T> {
    return this.length > 0;
  }

  /** The dates of the points in the timeseries. */
  get dates(): Date[] {
    return this.points.map((p) => p.date);
  }

  /** The values of the points in the timeseries. */
  get values(): T[] {
    return this.points.map((p) => p.value);
  }

  /**
   * Filters the timeseries by calling the provided `filterFn` on each point in
   * the timeseries.
   *
   * @param filterFn The function to call on each point in the timeseries. If it
   * returns true, the point will be kept, else discarded.
   * @returns A new timeseries with the filtered points.
   */
  filter(filterFn: (val: TimeseriesPoint<T>) => boolean): Timeseries<T> {
    return new Timeseries(this.points.filter(filterFn));
  }

  /**
   * Filters the timeseries down to the specified date range, specified using
   * either inclusive or exclusive endpoints.
   *
   * @param range The date range to keep.
   * @returns A new timeseries with the filtered points.
   */
  filterToDateRange(range: DateRange): Timeseries<T> {
    const { startAt, startAfter, endAt, endBefore } = range;
    return this.filter(
      (p) =>
        (!startAt || p.date >= startAt) &&
        (!startAfter || p.date > startAfter) &&
        (!endAt || p.date <= endAt) &&
        (!endBefore || p.date < endBefore)
    );
  }

  /**
   * Filters the timeseries by calling the provided `filterFn` on each value in
   * the timeseries.
   * @param filterFn The function to call on each value in the timeseries. If it
   * returns true, the point will be kept, else discarded.
   * @returns A new timeseries with the filtered points.
   */
  filterByValues(filterFn: (val: T) => boolean): Timeseries<T> {
    return new Timeseries(this.points.filter(({ value }) => filterFn(value)));
  }

  /**
   * Returns a new timeseries with the points in the timeseries mapped to new
   * points using the provided `mapFn` function. Points can be discarded by
   * returning undefined.
   *
   * @param mapFn The function to call on each point in the timeseries. The
   * return value is used as the point's value in the new timeseries. Undefined
   * can be returned to drop the point.
   * @returns A new timeseries with the mapped points.
   */
  map<R = T>(
    mapFn: (point: TimeseriesPoint<T>) => TimeseriesPoint<R> | undefined
  ): Timeseries<R> {
    const result: Array<TimeseriesPoint<R>> = [];
    for (const point of this.points) {
      const mappedPoint = mapFn(point);
      if (mappedPoint) {
        result.push(mappedPoint);
      }
    }
    return new Timeseries(result);
  }

  /**
   * Returns a new timeseries with the values in the timeseries mapped to new
   * values using the provided `mapFn` function.
   *
   * @param mapFn The function to call on each value in the timeseries. The
   * return value is used as the point's value in the new timeseries.
   * @returns A new timeseries with the mapped points.
   */
  mapValues<R = T>(mapFn: (val: T) => R): Timeseries<R> {
    return this.map((p) => ({
      date: p.date,
      value: mapFn(p.value),
    }));
  }

  /**
   * Returns a new Timeseries from the slice of data points indicated by the
   * provided `start` and `end` indices.
   *
   * @example
   * ```
   * ts.slice(2, 4); // Returns a Timeseries with the 3rd and 4th points.
   * ```
   *
   * @param start The first index to be included in the new Timeseries.
   * @param end The first index not to be included in the new Timeseries.
   * @returns A new Timeseries with the sliced data points.
   */
  slice(start: number, end?: number): Timeseries<T> {
    return new Timeseries(this.points.slice(start, end));
  }

  /**
   * Throws an exception if any values in the timeseries are not finite numbers
   * (e.g. strings, null, undefined, infinity, NaN).
   *
   * The returned timeseries will cast to `Timeseries<number>` so any subsequent
   * code doesn't need to deal with non-number values.
   */
  assertFiniteNumbers(): Timeseries<number> {
    this.points.forEach((p) => {
      assert(
        isFinite(p.value),
        `Found non-numeric (or non-finite) value in timeseries. date=${isoDateOnlyString(
          p.date
        )} value=${p.value}`
      );
    });
    return this.cast<number>();
  }

  /**
   * Throws an exception if any values in the timeseries are not boolean.
   *
   * The returned timeseries will cast to `Timeseries<boolean>` so any subsequent
   * code doesn't need to deal with non-boolean values.
   */
  assertBoolean(): Timeseries<boolean> {
    this.points.forEach((p) => {
      assert(
        typeof p.value === "boolean",
        `Found non-boolean value in timeseries. date=${isoDateOnlyString(
          p.date
        )} value=${p.value}`
      );
    });
    return this.cast<boolean>();
  }

  /**
   * Throws an exception if any values in the timeseries are not of type string.
   *
   * The returned timeseries will cast to `Timeseries<string>` so any subsequent
   * code doesn't need to deal with non-string values.
   */
  assertStrings(): Timeseries<string> {
    this.points.forEach((p) => {
      assert(
        typeof p.value === "string",
        `Found non-string value in timeseries. date=${isoDateOnlyString(
          p.date
        )} value=${p.value}`
      );
    });
    return this.cast<string>();
  }

  /**
   * Returns the point with the date closest to the provided date, or undefined
   * if the timeseries is empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   *
   * @param date The date to find the closest point to.
   * @returns The point with the date closest to the provided date or undefined
   * if the timeseries is empty.
   */
  findNearestDate(date: Date): TimeseriesPoint<T> | undefined {
    return minBy(this.points, (p) =>
      Math.abs(date.getTime() - p.date.getTime())
    );
  }

  /**
   * The first point in the timeseries, or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get first(): TimeseriesPoint<T> | undefined {
    return first(this.points);
  }

  /**
   * The first value in the timeseries, or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get firstValue(): T | undefined {
    return first(this.points)?.value;
  }

  /**
   * The last point in the timeseries or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get last(): TimeseriesPoint<T> | undefined {
    return last(this.points);
  }

  /**
   * The last value in the timeseries or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get lastValue(): T | undefined {
    return last(this.points)?.value;
  }

  /**
   * The minimum (earliest) date in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get minDate(): Date | undefined {
    return this.points[0]?.date;
  }

  /**
   * The maximum (latest) date in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get maxDate(): Date | undefined {
    return this.points[this.points.length - 1]?.date;
  }

  /**
   * The minimum value in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get minValue(): T | undefined {
    return minBy(this.points, (p) => p.value)?.value;
  }

  /**
   * The maximum value in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  get maxValue(): T | undefined {
    return maxBy(this.points, (p) => p.value)?.value;
  }

  /**
   * Returns the sum of all numeric values in the timeseries.
   */
  get sum(): number {
    return sumBy(this.points, (p) =>
      typeof p.value === "number" ? p.value : 0
    );
  }

  /**
   * Internal helper to cast the timeseries values to a new type. Should only be used after verifying
   * all values match the new type.
   */
  private cast<R>(): Timeseries<R> {
    return this as unknown as Timeseries<R>;
  }

  /**
   * Computes deltas between each point in the timeseries.
   *
   * @param opts.keepInitialValue Whether to include the initial value in the
   * series as a delta (with an assumed prior value of 0).
   * @param opts.minDeltaToKeep The minimum delta to keep. By default all deltas
   * are kept, but can be set to 0 to drop negative deltas or 1 to only keep
   * positive deltas.
   * @returns A timeseries made up of the deltas between timeseries points.
   */
  computeDeltas(opts?: {
    keepInitialValue?: boolean;
    minDeltaToKeep?: number;
  }): Timeseries<number> {
    const keepInitialValue = opts?.keepInitialValue ?? false;
    const minDeltaToKeep = opts?.minDeltaToKeep ?? Number.NEGATIVE_INFINITY;

    let lastValue: number | undefined = keepInitialValue ? 0 : undefined;
    return this.assertFiniteNumbers().map((point) => {
      const _lastValue = lastValue;
      lastValue = point.value;
      if (
        _lastValue !== undefined &&
        point.value - _lastValue >= minDeltaToKeep
      ) {
        return { date: point.date, value: point.value - _lastValue };
      }
    });
  }

  /**
   * Breaks the timeseries into overlapping windows of the specified size and
   * makes a new timeseries from them. Handy for computing aggregations like a
   * rolling average.
   *
   * @param opts.days The number of days to include in each window. Note that
   * the points at the beginning of the timeseries will have a smaller window
   * due to no prior history.
   * @returns A new timeseries that has a point for every point in the original
   * timeseries, but contains a `TimeseriesWindow` object containing the window
   * of points leading up to that point.
   */
  windowed(opts: { days: number }): Timeseries<TimeseriesWindow<T>> {
    if (!this.hasData()) {
      return this.cast<TimeseriesWindow<T>>();
    }
    const minDate = this.minDate;
    const days = opts.days;

    const pointsInCurrentWindow: Array<TimeseriesPoint<T>> = [];
    return this.map((point) => {
      pointsInCurrentWindow.push(point);
      const windowEnd = new PureDate(point.date);
      // subtract days-1 to get window start.
      let windowStart = windowEnd.addDays(-(days - 1));
      // Adjust windowStart if it is earlier than the earliest point in the timeseries.
      // We'll use a "partial" window for the initial days.
      // TODO(michael): Make this configurable?
      windowStart =
        windowStart.jsDate < minDate ? new PureDate(minDate) : windowStart;

      // Drop points that have fallen out of the window.
      while (pointsInCurrentWindow[0].date < windowStart.jsDate) {
        pointsInCurrentWindow.shift();
      }

      const windowSize = windowEnd.subtract(windowStart) + 1;
      return {
        date: windowEnd.jsDate,
        value: {
          startDate: windowStart.jsDate,
          endDate: windowEnd.jsDate,
          days: windowSize,
          windowTimeseries: new Timeseries(pointsInCurrentWindow.slice()),
        },
      };
    });
  }

  /**
   * Computes a rolling average of the timeseries where each point represents
   * the average of the prior `opts.days` days of data points.
   *
   * @param opts.days The number of days to average over.
   * @param opts.treatMissingDatesAsZero Whether to treat missing dates as 0.
   * This is typically what you want for "incidence" metrics (like "daily new
   * cases") but not "current" metrics (like "% of beds in use").
   * @returns A new timeseries containing the rolling average of the original one.
   */
  rollingAverage(opts: {
    days: number;
    treatMissingDatesAsZero?: boolean;
  }): Timeseries<number> {
    const treatMissingDatesAsZero = opts.treatMissingDatesAsZero ?? false;
    return this.assertFiniteNumbers()
      .windowed({ days: opts.days })
      .map((point) => {
        const date = point.date;
        const window = point.value;
        const days = treatMissingDatesAsZero
          ? window.days
          : window.windowTimeseries.length;
        const value = window.windowTimeseries.sum / days;
        return { date, value };
      });
  }

  /**
   * Internal helper to verify all dates are pure dates with no time component.
   */
  private static assertDatesHaveNoTimeComponent(points: TimeseriesPoint[]) {
    points.forEach((p, i) => {
      assert(
        p.date.toISOString().endsWith("T00:00:00.000Z"),
        `Dates in a timeseries must not have a (non-zero) time. Bad date at index ${i}: ${p.date.toISOString()} (value=${
          p.value
        })`
      );
    });
  }

  /**
   * Internal helper to verify there are no nil points in the timeseries.
   */
  private static assertPointsHaveNoNils(points: TimeseriesPoint[]) {
    points.forEach((p, i) => {
      assert(
        !isNil(p.value),
        `Timeseries may not contain null or undefined values. Found at index ${i}: ${p.date.toISOString()} (value=${
          p.value
        })`
      );
    });
  }

  /**
   * Construct a Timeseries instance from JSON timeseries points.
   *
   * @param jsonPoints Serialized timeseries points from which to construct a Timeseries.
   * @returns The constructed timeseries.
   */
  static fromJSON(jsonPoints: TimeseriesPointJSON[]): Timeseries<unknown> {
    const timeseriesPoints: TimeseriesPoint<unknown>[] = jsonPoints.map(
      (point) => ({ date: new Date(point.date), value: point.value as unknown })
    );
    return new Timeseries<unknown>(timeseriesPoints);
  }

  /**
   * Convert Timeseries instance into serialized JSON format.
   *
   * @returns Timeseries points serialized as JSON.
   */
  toJSON(): TimeseriesPointJSON[] {
    const timeseriesPointJSONs: TimeseriesPointJSON[] = this.points.map(
      (point) => ({
        date: isoDateOnlyString(point.date),
        value: point.value,
      })
    );
    return timeseriesPointJSONs;
  }
}

/**
 * An extension of the Timeseries class that can be used to represent a
 * timeseries that is known to be non-empty, allowing for non-nullable return
 * types for various methods.
 *
 * @example
 * Typically you get a `NonEmptyTimeseries` by using the `hasData()` type guard,
 * e.g.:
 * ```
 * if (ts.hasData()) {
 *   // ts is now a NonEmptyTimeseries so we can e.g. call last() without
 *   // checking for null or undefined.
 *   console.log(ts.last().value);
 * }
 * ```
 */
export interface NonEmptyTimeseries<T> extends Timeseries<T> {
  get first(): TimeseriesPoint<T>;
  get firstValue(): T;
  get last(): TimeseriesPoint<T>;
  get lastValue(): T;
  findNearestDate(date: Date): TimeseriesPoint<T>;
  get minDate(): Date;
  get maxDate(): Date;
  get minValue(): T;
  get maxValue(): T;
}
