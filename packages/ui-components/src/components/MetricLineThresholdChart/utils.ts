import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";

export interface ChartInterval {
  /** Upper bound of the interval, in data units. */
  upper: number;
  /** Lower bound of the interval, in data units. */
  lower: number;
  /** Level corresponding to the interval. */
  level: MetricLevel;
}

/**
 * Given a set of metric levels, thresholds and a minValue, maxValue for
 * a metric, it returns a set of closed intervals that include minValue
 * and maxValue. These intervals are used in the chart to paint different
 * line segments according to their level.
 *
 * @example
 * ```ts
 * calculateChartIntervals(
 *   [LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH],
 *   [10, 20],
 *   5,  // minValue
 *   25  // maxValue
 * );
 *
 * [
 *   { lowerBound:  5, upperBound: 10, level: LEVEL_LOW },
 *   { lowerBound: 10, upperBound: 20, level: LEVEL_MEDIUM },
 *   { lowerBound: 20, upperBound: 60, level: LEVEL_HIGH },
 * ]
 * ```
 *
 * Note that levels that don't intersect with the interval [minValue, maxValue]
 * won't be returned, since we won't need them in the chart.
 *
 * @example
 * ```ts
 * calculateChartIntervals(
 *   [LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH],
 *   [10, 20],
 *   5,  // minValue
 *   15  // maxValue
 * );
 *
 * // LEVEL_HIGH was filtered out since it's outside [minValue, maxValue]
 * [
 *   { lowerBound:  5, upperBound: 10, level: LEVEL_LOW },
 *   { lowerBound: 10, upperBound: 15, level: LEVEL_MEDIUM },
 * ]
 * ```
 *
 * @param metricLevels List of metric levels.
 * @param thresholds List of thresholds.
 * @param minValue Minimum value to show in the chart.
 * @param maxValue Maximum value to show in the chart.
 * @returns List of chart intervals.
 */
export function calculateChartIntervals(
  metricLevels: MetricLevel[],
  thresholds: number[],
  minValue: number,
  maxValue: number
): ChartInterval[] {
  assert(thresholds.length > 0, `There should be at least one threshold`);
  assert(
    metricLevels.length === thresholds.length + 1,
    `There should be one fewer threshold than levels`
  );

  const minVal = Math.min(minValue, maxValue);
  const maxVal = Math.max(minValue, maxValue);

  // Reverse the metric levels and thresholds if the thresholds are descending
  if (thresholds.length >= 2 && thresholds[1] < thresholds[0]) {
    return reverseList(
      calculateChartIntervals(
        reverseList(metricLevels),
        reverseList(thresholds),
        minVal,
        maxVal
      )
    );
  }

  const firstThreshold = thresholds[0];
  const lastThreshold = thresholds[thresholds.length - 1];

  // Build the intervals in the same order as the levels, and then
  // filter out the intervals that are not relevant for the chart.
  return metricLevels
    .map((level, levelIndex) => {
      const isFirstLevel = levelIndex === 0;
      const isLastLevel = levelIndex === metricLevels.length - 1;
      return {
        level,
        lower: isFirstLevel
          ? Math.min(minVal, firstThreshold)
          : thresholds[levelIndex - 1],
        upper: isLastLevel
          ? Math.max(maxVal, lastThreshold)
          : thresholds[levelIndex],
      };
    })
    .filter((interval) => interval.lower < interval.upper);
}

// Creates a copy of the input list and reverses its elements
function reverseList<T>(list: T[]): T[] {
  return [...list].reverse();
}
