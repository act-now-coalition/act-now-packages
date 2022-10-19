import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";

export interface ChartInterval {
  upperBound: number;
  lowerBound: number;
  level: MetricLevel;
}

/**
 * Given a set of metric levels, thresholds and minValue, maxValue for a
 * metric, calculates the numeric intervals that correspond to each
 * level.
 *
 *
 *
 * @param metricLevels
 * @param thresholds
 * @param minValue
 * @param maxValue
 * @returns
 */

export function calculateChartIntervals(
  metricLevels: MetricLevel[],
  thresholds: number[],
  minValue: number,
  maxValue: number
): ChartInterval[] {
  // assert:
  // - thresholds not empty
  // - thresholds and levels
  // - minValue < maxValue?
  // ascending?

  assert(thresholds.length > 0, `at least one threshold`);

  // descending
  if (thresholds.length >= 2 && thresholds[1] - thresholds[0] < 0) {
    return reverseList(
      calculateChartIntervals(
        reverseList(metricLevels),
        reverseList(thresholds),
        Math.min(minValue, maxValue),
        Math.max(minValue, maxValue)
      )
    );
  }

  const intervals = metricLevels
    .map((level, levelIndex) => {
      const isFirstLevel = levelIndex === 0;
      const isLastLevel = levelIndex === metricLevels.length - 1;

      return {
        level,
        lowerBound: isFirstLevel
          ? Math.min(minValue, thresholds[0])
          : thresholds[levelIndex - 1],
        upperBound: isLastLevel
          ? Math.max(maxValue, thresholds[thresholds.length - 1])
          : thresholds[levelIndex],
      };
    })
    .filter((interval) => interval.lowerBound < interval.upperBound);

  return intervals;
}

/**
 * Clone the list and reverse it, to avoid side effects
 */
function reverseList<T>(list: T[]): T[] {
  return [...list].reverse();
}
