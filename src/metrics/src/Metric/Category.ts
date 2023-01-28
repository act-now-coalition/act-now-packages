/**
 * An arbitrary category definition, consisting of category name, color, etc.
 *
 * Categories are used for example when categorizing metric values (e.g. values
 * <10 are categorized as "low" or the value 0 is categorized as "Off", etc.)
 * See {@link MetricCatalogOptions.metricCategorySets} and {@link
 * MetricDefinition.categorySetId}.
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
export interface Category {
  /** An arbitrary ID used to identify this category.  */
  id: string;

  /** Optional user-facing name for this category that could show up in UI or tooltips. */
  name?: string;

  /** Optional user-facing description for this category that could show up in UI or tooltips. */
  description?: string;

  /** The color used to represent this category (e.g. on maps or charts). */
  color: string;
}

/**
 * A set of categories that are used together, e.g. to categorize a specific
 * metric's values into "low", "medium", and "high" categories.
 *
 * @example
 * ```
 * {
 *   id: "default",
 *   categories: [
 *     { id: "low", "name": "Low", "color": "green" },
 *     { id: "medium", "name": "Medium", "color": "yellow" },
 *     { id: "high", "name": "High", "color": "red" },
 *   ],
 *   defaultCategory: { id: "unknown", "name": "Unknown", "color": "grey" }
 * }
 * ```
 */
export interface CategorySet {
  /** The ID used to identify this category set. */
  id: string;

  /**
   * The categories that make up this set.  Note that by convention, categories
   * should be ordered from lowest severity to highest severity.
   */
  categories: Category[];

  /**
   * A "default" category that's used e.g. when a metric value cannot be
   * explicitly graded or categorized due to missing data.
   */
  defaultCategory: Category;
}
