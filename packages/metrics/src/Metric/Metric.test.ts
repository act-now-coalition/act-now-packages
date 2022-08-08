import { MetricDefinition } from "packages/metrics/dist/Metric/MetricDefinition";
import { MetricCatalogOptions } from "../MetricCatalog/MetricCatalogOptions";
import { Metric } from "./Metric";
import { MetricLevelSet } from "./MetricLevel";

///// Test data used within tests /////

// Example of a typical metric with mostly default options.
const testMetricDef: MetricDefinition = {
  id: "cases",
  name: "Cases per 100k",
};

// Example of a typical MetricLevelSet with id "default", to be used by metrics
// that don't specify a non-default one.
const testLevelSet: MetricLevelSet = {
  id: "default",
  defaultLevel: { id: "unknown", color: "grey" },
  levels: [
    { id: "low", color: "green" },
    { id: "medium", color: "yellow" },
    { id: "high", color: "red" },
  ],
};

// Example of typical MetricCatalogOptions, including a default metric level set.
const testCatalogOptions: MetricCatalogOptions = {
  metricLevelSets: [testLevelSet],
};

describe("Metric", () => {
  test("constructor smoke test", () => {
    const metric = new Metric(testMetricDef, testCatalogOptions);
    expect(metric.id).toBe("cases");
    expect(metric.name).toBe("Cases per 100k");
  });

  test("constructor resolves levelSetId to correct levelSet", () => {
    const customLevelSet = { ...testLevelSet, id: "custom" };
    const catalogOptions = {
      metricLevelSets: [testLevelSet, customLevelSet],
    };

    const metric = new Metric(testMetricDef, catalogOptions);
    expect(metric.levelSet).toBe(testLevelSet);

    // Test with custom levelSetId.
    const metric2Def = { ...testMetricDef, levelSetId: "custom" };
    const metric2 = new Metric(metric2Def, catalogOptions);
    expect(metric2.levelSet).toBe(customLevelSet);
  });

  test("getLevel() grades values using thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        thresholds: [10, 20],
      },
      testCatalogOptions
    );
    expect(metric.getLevel(5).id).toBe("low");
    expect(metric.getLevel(15).id).toBe("medium");
    expect(metric.getLevel(25).id).toBe("high");

    // threshold values should err towards the lower level.
    expect(metric.getLevel(10).id).toBe("low");
    expect(metric.getLevel(20).id).toBe("medium");
  });

  test("getLevel() grades values using descending thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        thresholds: [20, 10],
      },
      testCatalogOptions
    );
    expect(metric.getLevel(5).id).toBe("high");
    expect(metric.getLevel(15).id).toBe("medium");
    expect(metric.getLevel(25).id).toBe("low");

    // threshold values should err towards the lower level.
    expect(metric.getLevel(10).id).toBe("medium");
    expect(metric.getLevel(20).id).toBe("low");
  });

  test("formatValue() with default options", () => {
    const metric = new Metric(testMetricDef);
    expect(metric.formatValue(123.123)).toBe("123.1");
  });

  test("formatValue() with custom options", () => {
    const metric = new Metric({
      ...testMetricDef,
      formatOptions: { style: "percent", maximumFractionDigits: 0 },
    });
    // Percent metrics are expected to be 0-1 ratios.
    expect(metric.formatValue(0.1234)).toBe("12%");
  });

  test("roundValue() with default options", () => {
    const metric = new Metric(testMetricDef);
    expect(metric.roundValue(123.15)).toBe(123.2);
  });

  test("roundValue() with custom options", () => {
    const metric = new Metric({
      ...testMetricDef,
      formatOptions: { style: "percent", maximumFractionDigits: 0 },
    });
    expect(metric.roundValue(0.123)).toBe(0.12);
  });
});
