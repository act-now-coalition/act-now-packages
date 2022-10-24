import { Category } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";

export interface ChartInterval {
  /** Upper bound of the interval, in data units. */
  upper: number;
  /** Lower bound of the interval, in data units. */
  lower: number;
  /** Category corresponding to the interval. */
  category: Category;
}

/**
 * Given a set of metric categories, thresholds and a minValue, maxValue for
 * a metric, it returns a set of closed intervals that include minValue
 * and maxValue. These intervals are used in the chart to paint different
 * line segments according to their category.
 *
 * @example
 * ```ts
 * calculateChartIntervals(
 *   [LOW, MEDIUM, HIGH],
 *   [10, 20],
 *   5,  // minValue
 *   25  // maxValue
 * );
 *
 * [
 *   { lowerBound:  5, upperBound: 10, category: LOW },
 *   { lowerBound: 10, upperBound: 20, category: MEDIUM },
 *   { lowerBound: 20, upperBound: 60, category: HIGH },
 * ]
 * ```
 *
 * Note that categories that don't intersect with the interval [minValue, maxValue]
 * won't be returned, since we won't need them in the chart.
 *
 * @example
 * ```ts
 * calculateChartIntervals(
 *   [LOW, MEDIUM, HIGH],
 *   [10, 20],
 *   5,  // minValue
 *   15  // maxValue
 * );
 *
 * // HIGH was filtered out since it's outside [minValue, maxValue]
 * [
 *   { lowerBound:  5, upperBound: 10, category: LOW },
 *   { lowerBound: 10, upperBound: 15, category: MEDIUM },
 * ]
 * ```
 *
 * @param metricCategories List of metric categories.
 * @param thresholds List of thresholds.
 * @param minValue Minimum value to show in the chart.
 * @param maxValue Maximum value to show in the chart.
 * @returns List of chart intervals.
 */
export function calculateChartIntervals(
  metricCategories: Category[],
  thresholds: number[],
  minValue: number,
  maxValue: number
): ChartInterval[] {
  assert(thresholds.length > 0, `There should be at least one threshold`);
  assert(
    metricCategories.length === thresholds.length + 1,
    `There should be one fewer threshold than categories`
  );

  const minVal = Math.min(minValue, maxValue);
  const maxVal = Math.max(minValue, maxValue);

  // Reverse the metric categories and thresholds if the thresholds are descending
  if (thresholds.length >= 2 && thresholds[1] < thresholds[0]) {
    return reverseList(
      calculateChartIntervals(
        reverseList(metricCategories),
        reverseList(thresholds),
        minVal,
        maxVal
      )
    );
  }

  const firstThreshold = thresholds[0];
  const lastThreshold = thresholds[thresholds.length - 1];
  const delta = 0.2 * (lastThreshold - firstThreshold);

  // Build the intervals in the same order as the categories, and then
  // filter out the intervals that are not relevant for the chart.
  return metricCategories
    .map((category, categoryIndex) => {
      const isFirstCategory = categoryIndex === 0;
      const isLastCategory = categoryIndex === metricCategories.length - 1;
      return {
        category,
        lower: isFirstCategory
          ? Math.min(minVal, firstThreshold - delta)
          : thresholds[categoryIndex - 1],
        upper: isLastCategory
          ? Math.max(maxVal, lastThreshold + delta)
          : thresholds[categoryIndex],
      };
    })
    .filter((interval) => interval.lower < interval.upper);
}

// Creates a copy of the input list and reverses its elements
function reverseList<T>(list: T[]): T[] {
  return [...list].reverse();
}
