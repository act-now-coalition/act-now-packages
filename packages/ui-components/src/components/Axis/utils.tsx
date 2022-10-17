import {
  DateFormat,
  formatDateTime,
  getTimeDiff,
  TimeUnit,
} from "@actnowcoalition/time-utils";

/**
 * Number of ticks are approximate, since this is calculated by visx.
 * More info: https://airbnb.io/visx/docs/axis#Axis_numTicks
 */
export function getNumTicks(width: number): number {
  if (width <= 300) {
    return 3;
  } else if (width <= 600) {
    return 5;
  } else if (width <= 900) {
    return 7;
  }
  return 10;
}

export function isOverOneYear(startDate: Date, endDate: Date): boolean {
  const dateRange = getTimeDiff(endDate, startDate, TimeUnit.DAYS);
  return dateRange > 365;
}

export function formatDateTick(date: Date, overOneYear: boolean): string {
  if (overOneYear) {
    // To-do (Fai): Add month and year separated by apostrophe as a date format.
    return date.getMonth() === 0
      ? formatDateTime(date, DateFormat.MMM_YY)
      : formatDateTime(date, DateFormat.MMM);
  } else return formatDateTime(date, DateFormat.MMM_D);
}
