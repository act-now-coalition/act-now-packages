import { Metric } from "./Metric";
import { CategorySet } from "./Category";
import { MetricDefinition } from "./MetricDefinition";
import { MetricCatalogOptions } from "../MetricCatalog";

// Example of a typical metric with mostly default options.
const testMetricDef: MetricDefinition = {
  id: "cases",
  name: "Cases per 100k",
  categorySetId: "low-medium-high",
};

// Thresholds consistent with the testCategorySet
const testMetricThresholds = [10, 20];

// Example of a typical CategorySet.
const testCategorySet: CategorySet = {
  id: "low-medium-high",
  defaultCategory: { id: "unknown", color: "grey" },
  categories: [
    { id: "low", name: "Low", color: "green" },
    { id: "medium", name: "Medium", color: "yellow" },
    { id: "high", name: "High", color: "red" },
  ],
};

// Example of a categoryValues to be used with the low-medium-high
// testCategorySet.
const testCategoryValues = [0, 1, 2];

// Example of typical MetricCatalogOptions, including our test category set.
const testCatalogOptions: MetricCatalogOptions = {
  categorySets: [testCategorySet],
};

describe("Metric", () => {
  test("constructor smoke test", () => {
    const metricDef = {
      ...testMetricDef,
      categoryThresholds: testMetricThresholds,
    };
    const metric = new Metric(metricDef, testCatalogOptions);
    expect(metric.id).toBe("cases");
    expect(metric.name).toBe("Cases per 100k");
  });

  test("constructor throws if categories and thresholds are not compatible", () => {
    // We have thresholds, but not a categorySet for the metric
    expect(() => {
      new Metric({
        ...testMetricDef,
        categoryThresholds: testMetricThresholds,
        categorySetId: undefined,
      });
    }).toThrowError(
      "[Metric(cases): Cases per 100k] defines categoryThresholds but does not specify the categorySetId of the categories to use the thresholds with. Add a categorySetId to your metric definition."
    );

    // The number of thresholds and categories are not compatible
    expect(() => {
      const metricDef = { ...testMetricDef, categoryThresholds: [10] };
      new Metric(metricDef, testCatalogOptions);
    }).toThrowError(
      "[Metric(cases): Cases per 100k] defines 1 thresholds in categoryThresholds but the referenced low-medium-high category set has 3 categories. There should be 1 fewer thresholds than there are categories. Add or remove thresholds as necessary."
    );
  });

  test("constructor throws if categories and categoryValues are not compatible", () => {
    // We have categoryValues, but not a categorySet for the metric
    expect(() => {
      new Metric({
        ...testMetricDef,
        categoryValues: testCategoryValues,
        categorySetId: undefined,
      });
    }).toThrowError(
      "[Metric(cases): Cases per 100k] defines categoryValues but does not specify the categorySetId of the categories to use the values with. Add a categorySetId to your metric definition."
    );

    // The number of categoryValues and categories are not compatible
    expect(() => {
      const metricDef = { ...testMetricDef, categoryValues: [0, 1] };
      new Metric(metricDef, testCatalogOptions);
    }).toThrowError(
      "[Metric(cases): Cases per 100k] defines 2 values in categoryValues but the referenced low-medium-high category set has 3 categories. There should be the same number of categoryValues as there are categories. Add or remove values as necessary."
    );
  });

  test("constructor resolves categorySetId to correct categorySet", () => {
    const customCategorySet = { ...testCategorySet, id: "custom" };
    const catalogOptions = {
      categorySets: [testCategorySet, customCategorySet],
    };

    const metric = new Metric(
      { ...testMetricDef, categoryThresholds: [10, 20] },
      catalogOptions
    );
    expect(metric.categorySet).toBe(testCategorySet);

    // Test with custom categorySetId.
    const metric2Def = {
      ...testMetricDef,
      thresholds: [10, 20],
      categorySetId: "custom",
    };
    const metric2 = new Metric(metric2Def, catalogOptions);
    expect(metric2.categorySet).toBe(customCategorySet);
  });

  test("getCategory() categorizes values using thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryThresholds: [10, 20],
      },
      testCatalogOptions
    );
    expect(metric.getCategory(5).id).toBe("low");
    expect(metric.getCategory(15).id).toBe("medium");
    expect(metric.getCategory(25).id).toBe("high");

    // threshold values should err towards the lower severity category.
    expect(metric.getCategory(10).id).toBe("low");
    expect(metric.getCategory(20).id).toBe("medium");
  });

  test("getCategory() categorizes values using thresholds that are descending", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryThresholds: [20, 10],
      },
      testCatalogOptions
    );
    expect(metric.getCategory(5).id).toBe("high");
    expect(metric.getCategory(15).id).toBe("medium");
    expect(metric.getCategory(25).id).toBe("low");

    // threshold values should err towards the lower severity category.
    expect(metric.getCategory(10).id).toBe("medium");
    expect(metric.getCategory(20).id).toBe("low");
  });

  test("formatValue() with default options", () => {
    const metric = new Metric(testMetricDef, testCatalogOptions);
    expect(metric.formatValue(123.123)).toBe("123.1");
  });

  test("formatValue() with custom options", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        formatOptions: { style: "percent", maximumFractionDigits: 0 },
      },
      testCatalogOptions
    );
    // Percent metrics are expected to be 0-1 ratios.
    expect(metric.formatValue(0.1234)).toBe("12%");
  });

  test("formatValue() on string values", () => {
    const metric = new Metric(testMetricDef, testCatalogOptions);
    expect(metric.formatValue("raw value")).toBe("raw value");
  });

  test("formatValue() on metric with categories", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryValues: testCategoryValues,
      },
      testCatalogOptions
    );
    expect(metric.formatValue(0)).toStrictEqual(
      testCategorySet.categories[0].name
    );
  });

  test("roundValue() with default options", () => {
    const metric = new Metric(testMetricDef, testCatalogOptions);
    expect(metric.roundValue(123.15)).toBe(123.2);
  });

  test("roundValue() with custom options", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        formatOptions: { style: "percent", maximumFractionDigits: 0 },
      },
      testCatalogOptions
    );
    expect(metric.roundValue(0.123)).toBe(0.12);
  });

  test("getCategory() with string values", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryValues: testCategoryValues,
      },
      testCatalogOptions
    );
    expect(metric.getCategory(0)).toBe(testCategorySet.categories[0]);
  });

  test("getCategory() returns default category when no matching value.", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryValues: testCategoryValues,
      },
      testCatalogOptions
    );
    expect(metric.getCategory("none")).toBe(testCategorySet.defaultCategory);
  });

  test("getColor() on metric with categories", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryValues: testCategoryValues,
      },
      testCatalogOptions
    );
    expect(metric.getColor(1)).toStrictEqual(
      testCategorySet.categories[1].color
    );
  });

  test("getColor() on metric with thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryThresholds: [10, 20],
      },
      testCatalogOptions
    );
    expect(metric.getColor(5)).toBe(testCategorySet.categories[0].color);
    expect(metric.getColor(null)).toBe(testCategorySet.defaultCategory.color);
  });
});
