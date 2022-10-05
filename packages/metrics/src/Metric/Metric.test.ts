import { Metric } from "./Metric";
import { MetricLevelSet } from "./MetricLevel";
import { MetricDefinition } from "./MetricDefinition";
import { MetricCatalogOptions } from "../MetricCatalog";
import { MetricCategory } from "./MetricCategory";

// Example of a typical metric with mostly default options.
const testMetricDef: MetricDefinition = {
  id: "cases",
  name: "Cases per 100k",
};
// Thresholds consistent with the testLevelSet
const testMetricThresholds = [10, 20];

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

// Example of a typical testCategories to be used by metrics.
const testCategories: MetricCategory[] = [
  { label: "Not started", color: "red", value: "no" },
  { label: "Done", color: "green", value: "yes" },
];

// Example of typical MetricCatalogOptions, including a default metric level set.
const testCatalogOptions: MetricCatalogOptions = {
  metricLevelSets: [testLevelSet],
};

describe("Metric", () => {
  test("constructor smoke test", () => {
    const metricDef = { ...testMetricDef, thresholds: testMetricThresholds };
    const metric = new Metric(metricDef, testCatalogOptions);
    expect(metric.id).toBe("cases");
    expect(metric.name).toBe("Cases per 100k");
  });

  test("constructor throws if levels and thresholds are not compatible", () => {
    // We have a levelSet, but no thresholds
    expect(() => {
      new Metric(testMetricDef, testCatalogOptions);
    }).toThrowError("Missing thresholds for metric");

    // We have thresholds, but not a levelSet for the metric
    expect(() => {
      new Metric({ ...testMetricDef, thresholds: testMetricThresholds });
    }).toThrowError("Missing levels for metric");

    // The number of thresholds and levels are not compatible
    expect(() => {
      const metricDef = { ...testMetricDef, thresholds: [10] };
      new Metric(metricDef, testCatalogOptions);
    }).toThrowError("There should be 1 fewer thresholds than levels.");
  });

  test("constructor resolves levelSetId to correct levelSet", () => {
    const customLevelSet = { ...testLevelSet, id: "custom" };
    const catalogOptions = {
      metricLevelSets: [testLevelSet, customLevelSet],
    };

    const metric = new Metric(
      { ...testMetricDef, thresholds: [10, 20] },
      catalogOptions
    );
    expect(metric.levelSet).toBe(testLevelSet);

    // Test with custom levelSetId.
    const metric2Def = {
      ...testMetricDef,
      thresholds: [10, 20],
      levelSetId: "custom",
    };
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

  test("getLevel() grades values using thresholds that are descending", () => {
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

  test("formatValue() on string values", () => {
    const metric = new Metric(testMetricDef);
    expect(metric.formatValue("raw value")).toBe("raw value");
  });

  test("formatValue() on metric with categories", () => {
    const metric = new Metric({
      ...testMetricDef,
      categories: testCategories,
    });
    expect(metric.formatValue("no")).toStrictEqual(testCategories[0].label);
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

  test("getCategory() with string values", () => {
    const metric = new Metric({
      ...testMetricDef,
      categories: testCategories,
    });
    expect(metric.getCategory("no")).toStrictEqual(testCategories[0]);
  });

  test("getCategory() fails with no matching value.", () => {
    const metric = new Metric({
      ...testMetricDef,
      categories: testCategories,
    });
    expect(() => {
      metric.getCategory("none");
    }).toThrow("No matching");
  });

  test("getColor() on metric with categories", () => {
    const metric = new Metric({
      ...testMetricDef,
      categories: testCategories,
    });
    expect(metric.getColor("no")).toStrictEqual(testCategories[0].color);
  });

  test("getColor() on metric with thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        thresholds: [10, 20],
      },
      testCatalogOptions
    );
    expect(metric.getColor(5)).toBe(testLevelSet.levels[0].color);
    expect(metric.getColor(null)).toBe(testLevelSet.defaultLevel.color);
  });
});
