import { assert } from "@actnowcoalition/assert";
import isFinite from "lodash/isFinite";
import isNil from "lodash/isNil";
import first from "lodash/first";
import last from "lodash/last";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";

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
export class Timeseries<T = unknown> {
  readonly points: Array<TimeseriesPoint<T>>;

  constructor(points: Array<TimeseriesPoint<T>>) {
    Timeseries.assertDatesHaveNoTimeComponent(points);
    // Sort the points by date.
    this.points = points
      .slice()
      .sort((a, b) => a.date.getTime() - b.date.getTime());
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

  /** Returns the dates of the points in the timeseries. */
  dates(): Date[] {
    return this.points.map((p) => p.date);
  }

  /** Returns the values of the points in the timeseries. */
  values(): T[] {
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
   * Returns a new timeseries with the values in the timeseries mapped to new
   * values using the provided `mapFn` function.
   *
   * @param mapFn The function to call on each value in the timeseries. The
   * return value is used as the point's value in the new timeseries.
   * @returns A new timeseries with the mapped points.
   */
  mapValues<R = T>(mapFn: (val: T) => R): Timeseries<R> {
    return new Timeseries(
      this.points.map((p) => ({
        date: p.date,
        value: mapFn(p.value),
      }))
    );
  }

  /**
   * Returns a new timeseries with all nulls and undefined values removed.
   *
   * The returned timeseries will have values of type `NonNullable<T>` and
   * therefore any subsequent code can rely on the values not being null.
   */
  removeNils(): Timeseries<NonNullable<T>> {
    return new Timeseries(this.points.filter((p) => !isNil(p.value))).cast<
      NonNullable<T>
    >();
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
        `Found non-numeric (or non-finite) value in timeseries. date=${Timeseries.isoDateString(
          p.date
        )} value=${p.value}`
      );
    });
    return this.cast<number>();
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
   * Returns the first point in the timeseries, or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  first(): TimeseriesPoint<T> | undefined {
    return first(this.points);
  }

  /**
   * Returns the last point in the timeseries or undefined if the timeseries is
   * empty.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  last(): TimeseriesPoint<T> | undefined {
    return last(this.points);
  }

  /**
   * Returns the minimum (earliest) date in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  minDate(): Date | undefined {
    return minBy(this.points, (p) => p.date)?.date;
  }

  /**
   * Returns the maximum (latest) date in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  maxDate(): Date | undefined {
    return maxBy(this.points, (p) => p.date)?.date;
  }

  /**
   * Returns the minimum value in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  minValue(): T | undefined {
    return minBy(this.points, (p) => p.value)?.value;
  }

  /**
   * Returns the maximum value in the timeseries.
   *
   * You can use {@link Timeseries.hasData} to guard against the timeseries
   * being empty and ensure this can't return undefined.
   */
  maxValue(): T | undefined {
    return maxBy(this.points, (p) => p.value)?.value;
  }

  /**
   * Internal helper to cast the timeseries values to a new type. Should only be used after verifying
   * all values match the new type.
   */
  private cast<R>(): Timeseries<R> {
    return this as unknown as Timeseries<R>;
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

  private static isoDateString(date: Date): string {
    // Dates are guaranteed not to have a time component so we just return the ISO date.
    return date.toISOString().split("T")[0];
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
  first(): TimeseriesPoint<T>;
  last(): TimeseriesPoint<T>;
  findNearestDate(date: Date): TimeseriesPoint<T>;
  minDate(): Date;
  maxDate(): Date;
  minValue(): T;
  maxValue(): T;
}
