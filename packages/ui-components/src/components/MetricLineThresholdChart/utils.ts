import { assert } from "@actnowcoalition/assert";
import { Category } from "@actnowcoalition/metrics";

import { LineInterval } from "../LineIntervalChart";

export interface ChartInterval extends LineInterval {
  /**
   * Metric category corresponding to the interval
   */
  category: Category;
}

/**
 * calculateChartIntervals returns a list of intervals that contain the thresholds, the minValue,
 * and the maxValue, given a set of metric categories, thresholds, a minValue, and a maxValue for
 * a metric.
 *
 * Examples:
 *
 *
 *         minValue      T1                      T2        maxValue
 *    --------|---------|-----------------------|------------|--------
 *
 * In this case, the intervals will be:
 *
 *   [
 *     { lower: minValue, upper: T1, level: LOW},
 *     { lower: T1, upper: T2, level: MEDIUM},
 *     { lower: T2, upper: maxValue, level: HIGH},
 *   ]
 *
 * In this situation, the first interval should be (-Infinity, T1], which
 * we can't use for the chart, so we calculate an amount of padding
 * and use it as the first interval's lower bound.
 * However, if `minValue` is greater than 0, the first interval's lower bound
 * should not be less than 0.
 *
 *                       T1      minValue        T2        maxValue
 *    ----------*-------|-----------|-----------|------------|--------
 *           T1 - padding or 0
 *
 * In this case, the intervals will be:
 *
 *   [
 *     { lower: T1 - padding or 0, upper: T1, level: LOW},
 *     { lower: T1, upper: T2, level: MEDIUM},
 *     { lower: T2, upper: maxValue, level: HIGH},
 *   ]
 *
 * If necessary, we adjust the upper bound of the last interval in the same way as
 * we do for the first interval.
 *
 * @param {Category[]} metricCategories Array of metric categories.
 * @param {number[]} thresholds Array of thresholds.
 * @param {number} minValue Minimum value to show in the chart.
 * @param {number} maxValue Maximum value to show in the chart.
 * @returns {ChartInterval[]} List of chart intervals.
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

  // If there are 2 or more thresholds and they are descending, reverse the metric categories and thresholds
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

  // Calculate padding to make sure each category has room for a label
  // to be rendered inside the category.
  // If there are multiple thresholds, we use 20% of the distance between the first and last threshold.
  // If there is only one threshold, we use 20% of the distance between `minValue` and `maxValue`.
  const padding =
    thresholds.length > 1
      ? 0.2 * (lastThreshold - firstThreshold)
      : 0.2 * (maxVal - minVal);

  // If minValue is greater than 0, don't pad below 0 on the y-axis
  const lowestBound = Math.min(minVal, firstThreshold);
  const chartMin = lowestBound >= 0 ? 0 : lowestBound - padding;
  const chartMax = Math.max(maxVal, lastThreshold + padding);

  // Build the intervals in the same order as the categories
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

// Create a copy of the input list and reverse its elements
function reverseList<T>(list: T[]): T[] {
  return [...list].reverse();
}
