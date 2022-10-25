import { Metric } from "@actnowcoalition/metrics";
import startCase from "lodash/startCase";

// TODO (Chelsi) - move these to MetricLegendThreshold (or somewhere more central than here)

export function getStartLabel(metric: Metric): string {
  if (metric.categorySet) {
    const { categories } = metric.categorySet;
    return categories[0].name ? startCase(categories[0].name) : "";
  }
  fail(
    `Metric must have categories to be used with metric-aware legends. ${metric} does not.`
  );
}

export function getEndLabel(metric: Metric): string {
  if (metric.categorySet) {
    const { categories } = metric.categorySet;
    const lastCategory = categories[categories.length - 1];
    return lastCategory.name ? startCase(lastCategory.name) : "";
  }
  fail(
    `Metric must have categories to be used with metric-aware legends. ${metric} does not.`
  );
}
