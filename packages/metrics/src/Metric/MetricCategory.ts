/**
 * A category for representing discrete metric values.
 *
 * Categories for a metric are defined in the
 * {@link MetricDefinition.categories} property, and the given category
 * for a metric value is extracted from {@link Metric.categories} using
 * {@link Metric.getCategory}.
 *
 * @example
 * ```
 * { label: "Unfinished", "color": "red", "value": "no" }
 * ```
 */
export interface MetricCategory {
  /** Name or description of the category.  */
  label: string;
  /** Color of the category. */
  color: string;
  /** Metric value that corresponds/maps to this MetricCategory */
  value: unknown;
}
