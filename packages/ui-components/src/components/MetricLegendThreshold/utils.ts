import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { CategoryItem } from "./interfaces";

export function getMetricCategoryItems(metric: Metric): CategoryItem[] {
  const metricCategories = metric.categorySet?.categories;
  const metricThresholds = metric.categoryThresholds;

  assert(metricCategories, `The metric needs to have categories`);

  return metricCategories.map((category, index) => ({
    name: category.name ?? category.id,
    color: category.color,
    description: category.description,
    endThreshold:
      metricThresholds && metric.formatValue(metricThresholds[index]),
  }));
}
