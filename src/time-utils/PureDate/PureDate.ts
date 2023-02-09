import { validate } from "../../validate";

/**
 * Represents a pure date (with no time component).  Useful for e.g.
 * representing dates in a timeseries.
 *
 * Internally the date is stored as a JS `Date` object in the UTC timezone with
 * midnight (00:00:00) as the time component.
 */
export class PureDate {
  /**
   * Returns a JS `Date` instance representing this date, with the time component set
   * to midnight UTC.
   */
  readonly jsDate: Date;

  /**
   * Constructs a new PureDate from a JS `Date` object or a YYYY-MM-DD string.
   * Throws an exception if the provided `date` has a nonzero time component.
   *
   * @param date Either a JS `Date` object or a YYYY-MM-DD string.
   */
  constructor(date: Date | string) {
    // TODO(michael): Perhaps we should be more strict on validating the string format.
    const jsDate = typeof date === "string" ? new Date(date) : date;
    validate(
      PureDate.isValid(jsDate),
      `Invalid PureDate contains nonzero timestamp: ${date}`
    );
    this.jsDate = jsDate;
  }

  /**
   * Checks if a `Date` object is valid as a `PureDate` (i.e. contains no time
   * component in UTC).
   *
   * @param jsDate The date to check.
   * @returns True if the date is valid, false otherwise.
   */
  static isValid(jsDate: Date): boolean {
    return jsDate.toISOString().endsWith("T00:00:00.000Z");
  }

  /** Returns a `PureDate` representing the day after the current date. */
  get next(): PureDate {
    return this.addDays(1);
  }

  /** Returns a `PureDate` representing the day before the current date. */
  get prev(): PureDate {
    return this.addDays(-1);
  }

  /** Returns a `PureDate` representing a date `days` ahead of the current date. */
  addDays(days: number): PureDate {
    const newDate = new Date(this.jsDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    return new PureDate(newDate);
  }

  /**
   * Returns the number of days between the current date and the provided
   * `other` date.
   *
   * @param other The other date to compare against.
   * @returns The number of days between the current date and the provided other date.
   */
  subtract(other: PureDate): number {
    // HACK: We use Math.round() which allows us to not worry about daylight saving time.
    return Math.round(
      (this.jsDate.getTime() - other.jsDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  /** Returns a string representation of this PureDate. */
  toString(): string {
    return this.jsDate.toISOString().replace(/T.*/, "");
  }
}
