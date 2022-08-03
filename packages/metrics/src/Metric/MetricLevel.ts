/**
 * A metric level (e.g. low/medium/high) used for metric grading.
 *
 * `MetricLevel`s are defined when creating a {@link MetricCatalog} via {@link
 * MetricCatalogOptions.metricLevelSets} and then used by metrics via their
 * {@link MetricDefinition.levelSet} property.
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

  /** The color used to represent this level (e.g. on maps or charts). */
  color: string;

  /** Indicates that this level should be the default for e.g. grading null values. */
  default?: boolean;
}
