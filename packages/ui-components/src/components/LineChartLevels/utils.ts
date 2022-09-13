import { MetricLevel } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";

interface LevelRange {
  fromValue: number;
  toValue: number;
  level: MetricLevel;
}

/**
 *
 * @param thresholds
 * @param minValue
 * @param maxValue
 * @param levels
 *
 */
export function generateRanges(
  thresholds: number[],
  minValue: number,
  maxValue: number,
  levels: MetricLevel[]
): LevelRange[] {
  // validate thresholds
  assert(thresholds.length >= 1, "Not enough thresholds");
  assert(levels.length >= 2, "error");
  assert(thresholds.length === levels.length - 1, "error");

  // TODO: More robust detection
  const isAscending = thresholds.length === 1 || thresholds[1] > thresholds[0];

  const edges = isAscending
    ? [minValue, ...thresholds, maxValue]
    : [maxValue, ...thresholds, minValue];

  return levels.map((level, levelIndex) => {
    return {
      fromValue: edges[levelIndex],
      toValue: edges[levelIndex + 1],
      level,
    };
  });
}
