import { DateFormat, getTimeDiff, TimeUnit } from "@actnowcoalition/time-utils";

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

export function getDateFormat(dateDomain: Date[]): DateFormat {
  const [minDate, maxDate] = dateDomain;
  const dateRange = getTimeDiff(maxDate, minDate, TimeUnit.DAYS);
  return dateRange < 365 ? DateFormat.MMM_D : DateFormat.MMM_YY;
}
