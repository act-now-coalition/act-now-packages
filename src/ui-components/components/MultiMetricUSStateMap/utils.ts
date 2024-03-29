import startCase from "lodash/startCase";

import { Metric } from "../../../metrics";
import { throwValidationError } from "../../../validate";

// TODO(#325) - move these to MetricLegendThreshold (or somewhere more central than here)

export function getStartLabel(metric: Metric): string {
  if (metric.categorySet) {
    const { categories } = metric.categorySet;
    return categories[0].name ? startCase(categories[0].name) : "";
  }
  throwValidationError(
    `Metric must have categories to be used with metric-aware legends. ${metric} does not.`
  );
}

export function getEndLabel(metric: Metric): string {
  if (metric.categorySet) {
    const { categories } = metric.categorySet;
    const lastCategory = categories[categories.length - 1];
    return lastCategory.name ? startCase(lastCategory.name) : "";
  }
  throwValidationError(
    `Metric must have categories to be used with metric-aware legends. ${metric} does not.`
  );
}
