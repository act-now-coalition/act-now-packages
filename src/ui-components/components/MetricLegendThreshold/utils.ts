import { assert } from "../../../assert";
import { Category, Metric } from "../../../metrics";

export interface CategoryItem {
  /**
   * Name of the category.
   */
  name: string;
  /**
   * Color corresponding to the category.
   */
  color: string;
  /**
   * Description of the category.
   */
  description: string | undefined;
  /**
   * Formatted value of the current category's upper bound.
   */
  endThreshold?: string;
  /** Show an arrow indicating the current category */
  showIndicator: boolean;
}

/**
 * `getMetricCategoryItems` formats the properties of a given metric's
 * categories into an array of category items (CategoryItem[]) to be
 * passed to MetricLegendThreshold.
 */

export function getMetricCategoryItems(
  metric: Metric,
  currentCategory?: Category
): CategoryItem[] {
  const metricCategories = metric.categorySet?.categories;
  const metricThresholds = metric.categoryThresholds;

  assert(metricCategories, `The metric needs to have categories`);

  return metricCategories.map((category, index) => ({
    name: category.name ?? category.id,
    color: category.color,
    description: category.description,
    endThreshold:
      metricThresholds && metric.formatValue(metricThresholds[index]),
    showIndicator: category === currentCategory,
  }));
}
