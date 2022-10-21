import { SnapshotJSON } from "../data";
import { MetricDefinition, CategorySet } from "../Metric";

/**
 * Options that can be provided when creating a {@link MetricCatalog} that apply
 * to the catalog or all metrics.
 */
export interface MetricCatalogOptions {
  /** Default options used for all metrics in the catalog, e.g. formatting options. */
  metricDefaults?: MetricDefinition;

  /**
   * Specifies sets of categories that can be used for grading or categorizing
   * metric values (e.g. into "low", "medium", and "high" categories). Sets
   * defined here can be referenced by metrics via their {@link
   * MetricDefinition.categorySetId} property.
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
  categorySets?: CategorySet[];

  /** JSON cache file to read metrics from instead of using DataProviders. */
  snapshot?: SnapshotJSON;
}
