import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { LevelItem } from "./interfaces";

export function getMetricLevelItems(metric: Metric): LevelItem[] {
  const metricLevels = metric.levelSet?.levels;
  const metricCategories = metric.categories;

  assert(
    metricCategories || metricLevels,
    `The metric needs to have either levels or categories`
  );

  if (metricCategories) {
    return metric.categories.map((category) => ({
      name: category.label,
      color: category.color,
      description: "",
      endThreshold: undefined,
    }));
  }

  assert(metricLevels, `The metric needs to have a defined levelSet`);

  const metricThresholds = metric.thresholds;
  return metricLevels.map((level, levelIndex) => ({
    name: level.name ?? level.id,
    color: level.color,
    description: level.description,
    endThreshold: metricThresholds
      ? metric.formatValue(metricThresholds[levelIndex])
      : undefined,
  }));
}
