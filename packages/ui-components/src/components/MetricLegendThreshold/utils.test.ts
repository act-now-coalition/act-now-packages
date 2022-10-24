import { getMetricCategoryItems } from "./utils";
import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";

describe("MetricLegendThreshold", () => {
  describe("getMetricCategoryItems", () => {
    test("returns expected categories for metrics with category thresholds", () => {
      const metricThresholds = metricCatalog.getMetric(MetricId.MOCK_CASES);
      const legendCategories = getMetricCategoryItems(metricThresholds);

      expect(legendCategories).toHaveLength(3);
      expect(legendCategories.map((d) => d.color)).toHaveLength(3);
      expect(legendCategories.map((d) => d.name)).toHaveLength(3);
    });

    test("returns expected categories for metrics with category values", () => {
      const metricCategories = metricCatalog.getMetric(MetricId.PASS_FAIL);
      const legendCategories = getMetricCategoryItems(metricCategories);

      expect(legendCategories).toHaveLength(2);
      expect(legendCategories.map((d) => d.color)).toHaveLength(2);
      expect(legendCategories.map((d) => d.name)).toHaveLength(2);
    });
  });
});
