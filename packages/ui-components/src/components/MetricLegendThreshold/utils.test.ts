import { getMetricLevelItems } from "./utils";
import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";

describe("MetricLegendThreshold", () => {
  describe("getMetricLevelItems", () => {
    test("returns expected levels for metrics with thresholds", () => {
      const metricThresholds = metricCatalog.getMetric(MetricId.MOCK_CASES);
      const legendLevels = getMetricLevelItems(metricThresholds);

      expect(legendLevels).toHaveLength(3);
      expect(legendLevels.map((d) => d.color)).toHaveLength(3);
      expect(legendLevels.map((d) => d.name)).toHaveLength(3);
    });

    test("returns expected levels for metrics with categories", () => {
      const metricCategories = metricCatalog.getMetric(MetricId.PASS_FAIL);
      const legendLevels = getMetricLevelItems(metricCategories);

      expect(legendLevels).toHaveLength(2);
      expect(legendLevels.map((d) => d.color)).toHaveLength(2);
      expect(legendLevels.map((d) => d.name)).toHaveLength(2);
    });
  });
});
