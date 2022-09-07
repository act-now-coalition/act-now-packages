/**
 * A metric level (e.g. low/medium/high) used for metric grading.
 *
 * `MetricLevel`s are defined when creating a {@link MetricCatalog} via {@link
 * MetricCatalogOptions.metricLevelSets} and then used by metrics via their
 * {@link MetricDefinition.levelSetId} property.
 *
 * @example
 * ```
 * { id: "low", "name": "Low", "color": "green" }
 * ```
 *
 * @example
 * ```
 * { id: "unknown", "name": "Unknown", "color": "grey", default: true }
 * ```
 */
export interface MetricLevel {
  /** An arbitrary ID used to identify this level.  */
  id: string;

  /** Optional user-facing name for this level that could show up in UI or tooltips. */
  name?: string;

  /** Optional user-facing description for this level that could show up in UI or tooltips. */
  description?: string;

  /** The color used to represent this level (e.g. on maps or charts). */
  color: string;
}

/**
 * A set of metric levels that can be used to grade a metric.
 *
 * @example
 * ```
 * {
 *   id: "default",
 *   levels: [
 *     { id: "low", "name": "Low", "color": "green" },
 *     { id: "medium", "name": "Medium", "color": "yellow" },
 *     { id: "high", "name": "High", "color": "red" },
 *   ],
 *   defaultLevel: { id: "unknown", "name": "Unknown", "color": "grey" }
 * }
 * ```
 */
export interface MetricLevelSet {
  /** The ID used to identify this level set, e.g. from {@link MetricDefinition.levelSetId }. */
  id: string;

  /**
   * The levels that make up this set.  Note that by convention, levels should
   * be ordered from lowest severity to highest severity.
   */
  levels: MetricLevel[];

  /** A "default" level that's used when a metric cannot be graded e.g. due to missing data. */
  defaultLevel: MetricLevel;
}
