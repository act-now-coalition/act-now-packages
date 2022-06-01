import { DateTime, Duration } from "luxon";
import { assert } from "@actnowcoalition/assert/src";

export enum DateFormat {
  YYYY_MM_DD = "yyyy-MM-dd", // 2020-03-01
  MM_DD_YYYY = "MM/dd/yyyy", // 03/01/2020
  MMM_DD_YYYY = "MMM dd, yyyy", // Mar 01, 2020
  MMM_D_YYYY = "MMM d, yyyy", // Mar 1, 2020
  MMMM_D_YYYY = "MMMM d, yyyy", // March 1, 2020
  MMM_YY = "MMM yy", // Mar 20
  MMMM_D = "MMMM d", // March 1
  MMM_D = "MMM d", // Mar 1
  MMM = "MMM", // Mar
  H_A_ZZZZ = "h a ZZZZ", // 8 AM PDT
}

// Luxon accepts both singular and plural properties of DurationObjects (e.g. hour and hours are valid).
// This enum maps to singular to make it usable by other Luxon functions that accept singular strings (e.g. 'hour').
export enum TimeUnit {
  HOURS = "hour",
  MINUTES = "minute",
  DAYS = "day",
  WEEKS = "week",
  MONTHS = "month",
}

/**
 * Parse date string to JS date object.
 *
 * Date string can be in any ISO 8601 format: https://moment.github.io/luxon/docs/manual/parsing.html
 *
 * @example
 * parseDateString('2020-03-01')  // "2020-03-01T08:00:00.000Z"
 */
export function parseDateString(dateString: string): Date {
  const parsedDate = DateTime.fromISO(dateString);
  assert(parsedDate.isValid, `Invalid input date string: ${dateString}`);
  return parsedDate.toJSDate();
}

/**
 * Parse unix timestamp (in milliseconds) to JS date object.
 *
 * @example
 * parseDateUnix(1616612130826) // "2021-03-24T18:55:30.826Z"
 */
export function parseDateUnix(unixTimestamp: number): Date {
  return DateTime.fromMillis(unixTimestamp).toJSDate();
}

/**
 * Format the date object according to the specified string token.
 *
 * Current string tokens are specified in DateFormat enum.
 * More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
 *
 * @example
 * formatDateTime(new Date(2020, 2, 1), DateFormat.YYYY_MM_DD)  // "2020-03-01"
 */
export function formatDateTime(date: Date, format: DateFormat): string {
  return DateTime.fromJSDate(date).toFormat(format);
}

/**
 * Format the date object to UTC and according to the specified string token.
 *
 * Current string tokens are specified in DateFormat enum.
 * More info about tokens: https://moment.github.io/luxon/docs/manual/formatting
 *
 * @example
 * formatUTCDateTime(new Date(2020, 1, 1, 20), DateFormat.YYYY_MM_DD) // "2020-02-02"
 * (Feb 1st 2020 at 8 pm. Pacific when converted to UTC will become Feb 2nd)
 */
export function formatUTCDateTime(date: Date, format: DateFormat): string {
  return DateTime.fromJSDate(date).toUTC().toFormat(format);
}

/**
 * Add a specified amount of time (in units) to date object.
 *
 * @example
 * addTime(new Date(2020, 2, 1), 5, TimeUnit.DAYS)  // "2020-03-06T08:00:00.000Z"
 */
export function addTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .plus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

/**
 * Subtract a specified amount of time (in units) from date object.
 *
 * @example
 * subtractTime(new Date(2020, 2, 10), 5, TimeUnit.DAYS)  // "2020-03-05T08:00:00.000Z"
 */
export function subtractTime(date: Date, amount: number, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date)
    .minus(getTimeUnitOption(amount, unit))
    .toJSDate();
}

/**
 * Convert a TimeUnit enum to a luxon Duration object.
 *
 * Some luxon functions accept a Duration object instead of a string as parameter.
 * So we must convert a TimeUnit enum to a luxon Duration object first before using these functions.
 *
 * @example
 * getTimeUnitOption(5, TimeUnit.HOURS) // Duration {values: { hours: 5 }, ... }
 */
function getTimeUnitOption(amount: number, unit: TimeUnit): Duration {
  switch (unit) {
    case TimeUnit.HOURS:
      return Duration.fromObject({ hours: amount });
    case TimeUnit.MINUTES:
      return Duration.fromObject({ minutes: amount });
    case TimeUnit.DAYS:
      return Duration.fromObject({ days: amount });
    case TimeUnit.WEEKS:
      return Duration.fromObject({ weeks: amount });
    case TimeUnit.MONTHS:
      return Duration.fromObject({ months: amount });
  }
}

/**
 * Get the starting point of a timeframe based on specified time unit.
 *
 * @example
 * getStartOf(new Date(2020, 2, 1, 8, 30), TimeUnit.HOURS)  // "2020-03-01T16:00:00.000Z"
 */
export function getStartOf(date: Date, unit: TimeUnit): Date {
  return DateTime.fromJSDate(date).startOf(unit).toJSDate();
}

/**
 * Calculate the difference between 2 dates in the given time unit.
 *
 * @example
 * getTimeDiff(dateTomorrow, dateToday, TimeUnit.DAYS)) // 1
 */
export function getTimeDiff(date1: Date, date2: Date, unit: TimeUnit) {
  return DateTime.fromJSDate(date1)
    .diff(DateTime.fromJSDate(date2), unit)
    .get(unit);
}
