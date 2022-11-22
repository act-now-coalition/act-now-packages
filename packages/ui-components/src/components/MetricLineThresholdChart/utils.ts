import { Category } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { LineInterval } from "../LineIntervalChart";

export interface ChartInterval extends LineInterval {
  /** Category corresponding to the interval. */
  category: Category;
}

/**
 * Given a set of metric categories, thresholds and a minValue, maxValue for
 * a metric, it returns a list of intervals that contain the thresholds and
 * both minValue and maxValue. Examples:
 *
 *
 *         minValue      T1                      T2        maxValue
 *    --------|---------|-----------------------|------------|--------
 *
 * In this case, we will have the following intervals:
 *
 *   [
 *     { lower: minValue, upper: T1, level: LOW},
 *     { lower: T1, upper: T2, level: MEDIUM},
 *     { lower: T2, upper: maxValue, level: HIGH},
 *   ]
 *
 * In this situation, the first interval should be (-Infinity, T1], which
 * we can't really use for the chart, so we calculate a padding amount
 * and use that as the lower bound for the first interval.
 * However, if minValue is higher than 0, then the lower bound
 * for the first interval should not be lower than 0.
 *
 *                       T1      minValue        T2        maxValue
 *    ----------*-------|-----------|-----------|------------|--------
 *           T1 - padding or 0
 *
 * In this case, the intervals will be
 *
 *   [
 *     { lower: T1 - padding or 0, upper: T1, level: LOW},
 *     { lower: T1, upper: T2, level: MEDIUM},
 *     { lower: T2, upper: maxValue, level: HIGH},
 *   ]
 *
 * We adjust the upper bound of the last interval in the same way if necessary.
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

  // Calculate a padding to make sure that each category has room for a label
  // to be rendered inside the category. Here, we use 20% of the distance
  // between the first and last threshold, or if we have only one threshold,
  // we use 20% of the distance between `minValue` and `maxValue`.
  const padding =
    thresholds.length > 1
      ? 0.2 * (lastThreshold - firstThreshold)
      : 0.2 * (maxVal - minVal);

  // If minValue is higher than 0, don't pad below 0 on the y-axis.
  const lowestBound = Math.min(minVal, firstThreshold - padding);
  const chartMin = lowestBound >= 0 ? Math.max(0, lowestBound) : lowestBound;
  const chartMax = Math.max(maxVal, lastThreshold + padding);

  // Build the intervals in the same order as the categories.
  return metricCategories.map((category, categoryIndex) => {
    const isFirstCategory = categoryIndex === 0;
    const isLastCategory = categoryIndex === metricCategories.length - 1;
    return {
      category,
      lower: isFirstCategory ? chartMin : thresholds[categoryIndex - 1],
      upper: isLastCategory ? chartMax : thresholds[categoryIndex],
      color: category.color,
    };
  });
}

// Creates a copy of the input list and reverses its elements
function reverseList<T>(list: T[]): T[] {
  return [...list].reverse();
}
