import {
  TimeUnit,
  getStartOf,
  getTimeDiff,
  addTime,
  DateFormat,
  formatDateTime,
} from "@actnowcoalition/time-utils";
import range from "lodash/range";

export function getTimeAxisTicks(from: Date, to: Date, timeUnit: TimeUnit) {
  const dateFrom = getStartOf(from, timeUnit);
  const numTimeUnit = getTimeDiff(to, dateFrom, timeUnit);
  return range(1, numTimeUnit + 1).map((i: number) =>
    addTime(dateFrom, i, timeUnit)
  );
}

export const getXTickFormat = (date: Date, timeUnit: TimeUnit) => {
  if (timeUnit === TimeUnit.WEEKS) {
    return formatDateTime(date, DateFormat.MMM_D);
  } else {
    // Shows the year if the tick is in January (0) or December (11)
    const dateFormat =
      date.getMonth() === 0 || date.getMonth() === 11
        ? DateFormat.MMM_YY
        : DateFormat.MMM;
    return formatDateTime(date, dateFormat).replace(" ", "'");
  }
};
