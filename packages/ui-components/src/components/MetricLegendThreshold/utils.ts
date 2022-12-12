import { assert } from "@actnowcoalition/assert";
import { Category, Metric } from "@actnowcoalition/metrics";

export interface CategoryItem {
  /** Category name (e.g. "High") */
  name: string;
  /** Category color */
  color: string;
  /** Description of the category */
  description: string | undefined;
  /** Formatted value of the threshold at the end of the current category */
  endThreshold?: string;
  /** Show an arrow indicating the current category */
  showIndicator: boolean;
}

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
