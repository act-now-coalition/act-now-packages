import { MetricDefinition } from "../Metric/MetricDefinition";
import { MetricLevelSet } from "../Metric/MetricLevel";

/**
 * Options that can be provided when creating a {@link MetricCatalog} that apply
 * to the catalog or all metrics.
 */
export interface MetricCatalogOptions {
  /** Default options used for all metrics in the catalog, e.g. formatting options. */
  metricDefaults?: MetricDefinition;

  /**
   * Specifies sets of levels that can be used for metric grading. By default
   * metrics will use the "default" level set, but additional sets can be provided
   * and referenced by metrics via their {@link MetricDefinition.levelSetId} property.
   *
   * @example
   * ```
   * {
   *   "default": [
   *     { id: "low", "name": "Low", "color": "green" },
   *     { id: "medium", "name": "Medium", "color": "yellow" },
   *     { id: "high", "name": "High", "color": "red" },
   *     { id: "unknown", "name": "Unknown", "color": "grey", default: true }
   *   ],
   *   "vaccine-levels": [
   *     { id: "low", "name": "Low", "color": "lightblue" },
   *     { id: "medium", "name": "Medium", "color": "blue" },
   *     { id: "high", "name": "High", "color": "darkblue" },
   *     { id: "unknown", "name": "Unknown", "color": "grey", default: true }
   *   ]
   * }
   * ```
   */
  metricLevelSets?: MetricLevelSet[];
}
