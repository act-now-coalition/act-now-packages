import { Timeseries, TimeseriesPoint } from "./Timeseries";
import { assert } from "@actnowcoalition/assert";
import findLastIndex from "lodash/findLastIndex";

/**
 * Returns a new Timeseries computed via a rolling average of the provided `timeseries`.
 *
 * @param timeseries The timeseries to compute a rolling average of.
 * @param days The number of days to include in the rolling average.
 * @param includeTrailingZeros Whether to include trailing zero points (else the
 * returned timeseries will truncate them).
 * @returns A new Timeseries computed via a rolling average of the provided timeseries.
 */
export function rollingAverage(
  timeseries: Timeseries<number | null>,
  days = 7,
  includeTrailingZeros = true
): Timeseries<number | null> {
  // TODO(michael): Ideally we could handle gaps in dates but for now just
  // assert there are none.
  assertDatesHaveNoGaps(timeseries);

  const result: Array<TimeseriesPoint<number | null>> = [];
  let sum = 0;
  let count = 0;
  let lastValidIndex = timeseries.length - 1;
  const points = timeseries.points;
  if (!includeTrailingZeros) {
    lastValidIndex = findLastIndex(
      points,
      (p) => p.value !== null && p.value !== 0
    );
  }
  for (let i = 0; i < timeseries.length; i++) {
    const oldValue = i < days ? null : points[i - days].value;
    if (oldValue !== null) {
      sum -= oldValue;
      count--;
    }

    const newValue = points[i].value;
    if (newValue !== null && i <= lastValidIndex) {
      sum += newValue;
      count++;
      result.push({ date: points[i].date, value: sum / count });
    } else {
      result.push({ date: points[i].date, value: null });
    }
  }

  return new Timeseries<number | null>(result);
}

/**
 * Throws an exception if the dates have any gaps (i.e. they're not sequential
 * by day).
 *
 * TODO(michael): This function only exists for rollingAverage() right now.  I'd
 * like to make rollingAverage() work on sparse timeseries and then remove this
 * function. It is exported only for unit testing.
 */
export function assertDatesHaveNoGaps<T>(timeseries: Timeseries<T>): void {
  let nextDate: Date | undefined;
  timeseries.points.forEach((p) => {
    assert(
      !nextDate || nextDate.getTime() === p.date.getTime(),
      `Timeseries has gaps in dates (${nextDate} is missing)`
    );
    const datePlusOne = new Date(p.date);
    datePlusOne.setUTCDate(datePlusOne.getUTCDate() + 1);
    nextDate = datePlusOne;
  });
}
