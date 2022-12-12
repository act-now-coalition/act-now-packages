import {
  DateFormat,
  TimeUnit,
  formatUTCDateTime,
  getTimeDiff,
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

export function isOverTwoMonths(startDate: Date, endDate: Date): boolean {
  const dateRange = getTimeDiff(endDate, startDate, TimeUnit.MONTHS);
  return dateRange > 2;
}

export function formatDateTick(date: Date, isOverTwoMonths: boolean): string {
  if (isOverTwoMonths) {
    // TODO (#414) : Add month and year separated by apostrophe as a date format
    return date.getMonth() === 0
      ? formatUTCDateTime(date, DateFormat.MMM_YY)
      : formatUTCDateTime(date, DateFormat.MMM);
  } else return formatUTCDateTime(date, DateFormat.MMM_D);
}
