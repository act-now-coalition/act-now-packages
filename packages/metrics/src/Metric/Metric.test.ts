import { Metric } from "./Metric";
import { CategorySet } from "./Category";
import { MetricDefinition } from "./MetricDefinition";
import { MetricCatalogOptions } from "../MetricCatalog";

// Example of a typical metric with mostly default options.
const testMetricDef: MetricDefinition = {
  id: "cases",
  name: "Cases per 100k",
  categorySetId: "low-medium-high-critical",
};

// Thresholds consistent with the testCategorySet
const testMetricThresholds = [10, 20, 30];

// Example of a typical CategorySet.
const testCategorySet: CategorySet = {
  id: "low-medium-high-critical",
  defaultCategory: { id: "unknown", color: "grey" },
  categories: [
    { id: "low", name: "Low", color: "green" },
    { id: "medium", name: "Medium", color: "yellow" },
    { id: "high", name: "High", color: "red" },
    { id: "critical", name: "Critical", color: "maroon" },
  ],
};

// Example of a categoryValues to be used with the low-medium-high-critical
// testCategorySet.
const testCategoryValues = [0, 1, 2, 3];

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
      "[Metric(cases): Cases per 100k] defines 1 thresholds in categoryThresholds but the referenced low-medium-high-critical category set has 4 categories. There should be 1 fewer thresholds than there are categories. Add or remove thresholds as necessary."
    );
  });

  test("constructor doesn't throw if thresholds are sorted", () => {
    const categoryThresholds = [50, 100, 200];
    const metricDef = {
      ...testMetricDef,
      categorySetId: "low-medium-high-critical",
      categoryThresholds,
    };

    expect(() => new Metric(metricDef, testCatalogOptions)).not.toThrowError();
    expect(() => {
      new Metric(
        { ...metricDef, categoryThresholds: [...categoryThresholds].reverse() },
        testCatalogOptions
      );
    }).not.toThrowError();
  });

  test("constructor throws if thresholds are not sorted", () => {
    const categoryThresholds = [100, 300, 200];
    const metricDef = { ...testMetricDef, categoryThresholds };

    expect(() => {
      new Metric(metricDef, testCatalogOptions);
    }).toThrowError(
      `[Metric(cases): Cases per 100k] has thresholds 100,300,200 which are not in order. Reorder the thresholds so they are strictly ascending or descending.`
    );
    expect(() => {
      new Metric(
        { ...metricDef, categoryThresholds: [...categoryThresholds].reverse() },
        testCatalogOptions
      );
    }).toThrowError(
      `[Metric(cases): Cases per 100k] has thresholds 200,300,100 which are not in order. Reorder the thresholds so they are strictly ascending or descending.`
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
      "[Metric(cases): Cases per 100k] defines 2 values in categoryValues but the referenced low-medium-high-critical category set has 4 categories. There should be the same number of categoryValues as there are categories. Add or remove values as necessary."
    );
  });

  test("constructor resolves categorySetId to correct categorySet", () => {
    const customCategorySet = { ...testCategorySet, id: "custom" };
    const catalogOptions = {
      categorySets: [testCategorySet, customCategorySet],
    };

    const metric = new Metric(
      { ...testMetricDef, categoryThresholds: [10, 20, 30] },
      catalogOptions
    );
    expect(metric.categorySet).toBe(testCategorySet);

    // Test with custom categorySetId.
    const metric2Def = {
      ...testMetricDef,
      thresholds: [10, 20, 30],
      categorySetId: "custom",
    };
    const metric2 = new Metric(metric2Def, catalogOptions);
    expect(metric2.categorySet).toBe(customCategorySet);
  });

  test("getCategory() categorizes values using thresholds", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        categoryThresholds: [10, 20, 30],
      },
      testCatalogOptions
    );
    expect(metric.getCategory(5).id).toBe("low");
    expect(metric.getCategory(15).id).toBe("medium");
    expect(metric.getCategory(25).id).toBe("high");
    expect(metric.getCategory(35).id).toBe("critical");

    // threshold values should err towards the lower severity category.
    expect(metric.getCategory(10).id).toBe("low");
    expect(metric.getCategory(20).id).toBe("medium");
    expect(metric.getCategory(30).id).toBe("high");
  });

  test("getCategory() categorizes values using thresholds that are descending", () => {
    const metric = new Metric(
      { ...testMetricDef, categoryThresholds: [30, 20, 10] },
      testCatalogOptions
    );
    expect(metric.getCategory(5).id).toBe("critical");
    expect(metric.getCategory(15).id).toBe("high");
    expect(metric.getCategory(25).id).toBe("medium");
    expect(metric.getCategory(35).id).toBe("low");

    // threshold values should err towards the lower severity category.
    expect(metric.getCategory(10).id).toBe("high");
    expect(metric.getCategory(20).id).toBe("medium");
    expect(metric.getCategory(30).id).toBe("low");
  });

  test("formatValue() with default options", () => {
    const metric = new Metric(testMetricDef, testCatalogOptions);
    expect(metric.formatValue(123.123)).toBe("123.1");
  });

  test("formatValue() as integer", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        formatOptions: { maximumFractionDigits: 0 },
      },
      testCatalogOptions
    );
    expect(metric.formatValue(123.123)).toBe("123");
  });

  test("formatValue() with one decimal point", () => {
    const metric = new Metric(
      {
        ...testMetricDef,
        formatOptions: { minimumFractionDigits: 1, maximumFractionDigits: 1 },
      },
      testCatalogOptions
    );
    expect(metric.formatValue(0.1234)).toBe("0.1");
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
        categoryThresholds: [10, 20, 30],
      },
      testCatalogOptions
    );
    expect(metric.getColor(5)).toBe(testCategorySet.categories[0].color);
    expect(metric.getColor(null)).toBe(testCategorySet.defaultCategory.color);
  });
});
