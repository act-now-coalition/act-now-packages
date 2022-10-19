import { MetricDataReference } from "./MetricDataReference";

/**
 * A set of parameters that define a given metric (name, data source, thresholds, etc.).
 * This definition can be passed to the {@link Metric} constructor to create a `Metric`
 * or included in the definitions for a {@link MetricCatalog} to create a catalog of
 * metrics.
 *
 * All parameters are optional and should be omitted if default values are okay.
 *
 * The definition is specified using pure JSON types so that it could be read
 * from a file or CMS.
 */
export interface MetricDefinition {
  /** A unique ID that can be used to reference this metric (e.g. "cases_per_100k"). */
  id: string;

  /** Specifies how to fetch data for this metric.  See {@link MetricDataReference} and {@link MetricDataProvider} */
  dataReference?: MetricDataReference;

  /** The default user-facing display name of the metric (e.g. "Cases per 100k"). */
  name?: string;

  /**
   * A longer name for the metric used when space is not a concern (e.g. "Cases
   * per 100k population")
   */
  extendedName?: string;

  /**
   * References a set of categories that this metric should use for grading /
   * categorizing values (e.g. "vaccine-categories"). The available {@link
   * CategorySet} definitions are defined when constructing the {@link
   * MetricCatalog} via {@link MetricCatalogOptions.categorySets}.
   *
   * Use with either {@link MetricDefinition.categoryThresholds} or {@link
   * MetricDefinition.categoryValues}.
   */
  categorySetId?: string;

  /**
   * Thresholds used for grading the metric. These correspond to the categories
   * specified by {@link MetricDefinition.categorySetId } and there should be one
   * fewer threshold than there are categories.
   *
   * @example
   * ```
   *   // Assuming categories are [low, medium, high]
   *   categoryThresholds: [10, 20]
   *   // then <=10 is low, 10.1-20 is medium, and >20 is high.
   *
   *   // Thresholds can be descending as well.
   *   categoryThresholds: [20, 10]
   *   // then >=20 is low, 10-19.9 is medium, and <10 is high.
   * ```
   */
  categoryThresholds?: number[];

  /**
   * A list of discrete metric values to be used for categorizing this metric's
   * values (e.g. value 0 should be categorized as "fail" category, 1
   * categorized as "pass" category).
   *
   * @example
   * ```
   *   // Assuming categories are [fail, pass]
   *   categoryValues: [0, 1]
   * ```
   */
  categoryValues?: Array<unknown>;

  /**
   * Specifies options used to format the metric value when it is displayed.
   */
  formatOptions?: Intl.NumberFormatOptions;

  /** Minimum possible value for the given metric. */
  minValue?: number;

  /** Maximum possible value for the given metric. */
  maxValue?: number;

  /**
   * Arbitrary extra metadata related to the metric. This is not used by any
   * bultin @actnowcoalition packages but can be used for custom application
   * metadata that's useful to tie to the metric.
   */
  extra?: Record<string, unknown>;
}
