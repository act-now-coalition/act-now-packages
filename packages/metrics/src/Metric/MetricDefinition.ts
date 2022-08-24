import { MetricCategory } from "./MetricCategory";
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
   * Thresholds used for grading the metric. These correspond to the levels
   * specified by {@link MetricDefinition.levelSetId } and there should be one
   * fewer threshold than there are levels.
   *
   * Example:
   * ```
   *   // Assuming levels are [low, medium, high]
   *   thresholds: [10, 20]
   *   // then <=10 is low, 10.1-20 is medium, and >20 is high.
   *
   *   // Thresholds can be descending as well.
   *   thresholds: [20, 10]
   *   // then >=20 is low, 10-19.9 is medium, and <10 is high.
   * ```
   */
  thresholds?: number[];

  /**
   * References a set of levels that this metric should use for grading (e.g.
   * "default" or "vaccine-levels"). The available { @link MetricLevelSet }
   * definitions are defined when constructing the {@link MetricCatalog}.
   */
  levelSetId?: string;

  /**
   * Categories used for representing or displaying a discrete metric (e.g. "Yes", "No").
   */
  categories?: Array<MetricCategory>;

  /**
   * Specifies options used to format the metric value when it is displayed.
   */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Arbitrary extra metadata related to the metric. This is not used by any
   * bultin @actnowcoalition packages but can be used for custom application
   * metadata that's useful to tie to the metric.
   */
  extra?: Record<string, unknown>;
}
