import isEqual from "lodash/isEqual";
import last from "lodash/last";

import { isFinite } from "../../number-format";
import { throwValidationError, validate } from "../../validate";
import { MetricCatalogOptions } from "../MetricCatalog";
import { Category, CategorySet } from "./Category";
import { MetricDataReference } from "./MetricDataReference";
import { MetricDefinition } from "./MetricDefinition";

/** Default format options used for metrics that don't specify any. */
const DEFAULT_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: 1,
};

/**
 * Represents something that can be measured, often over a period of time (to
 * create a timeseries). Apps will typically use many different metrics stored
 * in a {@link MetricCatalog}.
 *
 * The `Metric` itself does not contain any data. It only contains the metadata
 * that defines the metric (name, data source, thresholds, etc.). To fetch data,
 * see e.g. {@link MetricCatalog.fetchData}.
 */
export class Metric {
  /** {@inheritDoc MetricDefinition.id} */
  readonly id: string;
  /** {@inheritDoc MetricDefinition.dataReference} */
  readonly dataReference?: MetricDataReference;
  /** {@inheritDoc MetricDefinition.name} */
  readonly name: string;
  /** {@inheritDoc MetricDefinition.extendedName} */
  readonly extendedName: string;
  /** @inheritDoc MetricDefinition.categorySetId */
  readonly categorySetId?: string;
  /** {@inheritDoc MetricDefinition.categoryThresholds} */
  readonly categoryThresholds?: number[];
  /** {@inheritDoc MetricDefinition.categoryValues} */
  readonly categoryValues?: unknown[];
  /** {@inheritDoc MetricDefinition.formatOptions} */
  readonly formatOptions: Intl.NumberFormatOptions;
  /** {@inheritDoc MetricDefinition.extra} */
  readonly extra?: Record<string, unknown>;
  /** {@inheritDoc MetricDefinition.minValue} */
  readonly minValue?: number;
  /** {@inheritDoc MetricDefinition.maxValue} */
  readonly maxValue?: number;

  /**
   * The set of categories used to categorize metric values. Populated from { @link
   * MetricDefinition.categorySetId }.
   */
  readonly categorySet?: CategorySet;

  /**
   * Constructs a Metric from the given definition and optional catalogOptions.
   *
   * @param definition The JSON definition of the metric.
   * @param catalogOptions Catalog options that should be applied to all metrics
   * in a catalog. These are typically provided to the {@link MetricCatalog}
   * when it is constructed which passes them down to here when constructing
   * the `Metric` objects.
   */
  constructor(
    definition: MetricDefinition,
    catalogOptions?: MetricCatalogOptions
  ) {
    const categorySets = catalogOptions?.categorySets ?? [];
    const metricDefaults = catalogOptions?.metricDefaults;

    // Apply any metric defaults from the catalog.
    const def = { ...metricDefaults, ...definition };

    this.id = def.id;
    this.dataReference = def.dataReference;
    this.name = def.name ?? `${this.id}`;
    this.extendedName = def.extendedName ?? "";
    this.categorySetId = def.categorySetId;
    this.categoryThresholds =
      (def.categoryThresholds ?? []).length > 0
        ? def.categoryThresholds
        : undefined;
    this.categoryValues =
      (def.categoryValues ?? []).length > 0 ? def.categoryValues : undefined;
    this.formatOptions = def.formatOptions ?? DEFAULT_FORMAT_OPTIONS;
    this.extra = def.extra;
    this.minValue = def.minValue;
    this.maxValue = def.maxValue;

    if (this.categorySetId) {
      this.categorySet = categorySets.find(
        (cs) => cs.id === this.categorySetId
      );
      validate(
        this.categorySet,
        `Metric ${this.id} specified categorySetId ${this.categorySetId} but it does not exist. You need to include an appropriate CategorySet in MetricCatalogOptions.categorySets when constructing the MetricCatalog.`
      );
    }

    if (this.minValue && this.maxValue) {
      validate(
        this.minValue <= this.maxValue,
        `Minimum value must be less than maximum value. ` +
          `Got min: ${this.minValue}, max: ${this.maxValue}`
      );
    }

    // Validate we don't have categoryThresholds and categoryValues.
    validate(
      !(this.categoryValues && this.categoryThresholds),
      `${this} defines both categoryValues and categoryThresholds which is invalid. Remove one or the other depending on whether this metric should be categorized via thresholds or via discrete values.`
    );

    // Validate categoryThresholds.
    if (this.categoryThresholds) {
      validate(
        this.categorySet,
        `${this} defines categoryThresholds but does not specify the categorySetId of the categories to use the thresholds with. Add a categorySetId to your metric definition.`
      );
      validate(
        this.categoryThresholds.length ===
          this.categorySet.categories.length - 1,
        `${this} defines ${this.categoryThresholds.length} thresholds in categoryThresholds but the referenced ${this.categorySetId} category set has ${this.categorySet.categories.length} categories. There should be 1 fewer thresholds than there are categories. Add or remove thresholds as necessary.`
      );

      // Verify they're sorted. We need to pass a comparator function to `sort`,
      // otherwise the values are converted to string before sorting.
      const sorted = this.categoryThresholds.slice().sort((a, b) => a - b);
      const sortedReverse = sorted.slice().reverse();
      validate(
        isEqual(sorted, this.categoryThresholds) ||
          isEqual(this.categoryThresholds, sortedReverse),
        `${this} has thresholds ${this.categoryThresholds} which are not in order. Reorder the thresholds so they are strictly ascending or descending.`
      );
    }

    // Validate categoryValues.
    if (this.categoryValues) {
      validate(
        this.categorySet,
        `${this} defines categoryValues but does not specify the categorySetId of the categories to use the values with. Add a categorySetId to your metric definition.`
      );
      validate(
        this.categoryValues.length === this.categorySet.categories.length,
        `${this} defines ${this.categoryValues.length} values in categoryValues but the referenced ${this.categorySetId} category set has ${this.categorySet.categories.length} categories. There should be the same number of categoryValues as there are categories. Add or remove values as necessary.`
      );
    }
  }

  /**
   * Returns true if this metric supports categorizing values by calling {@link Metric.getCategory}.
   */
  get hasCategories(): boolean {
    return (
      this.categoryThresholds !== undefined || this.categoryValues !== undefined
    );
  }

  /**
   * Uses this metric's categorization logic (based on {@link
   * MetricDefinition.categoryThresholds } or {@link
   * MetricDefinition.categoryValues}) to categorize the provided value to a
   * `Category`.
   *
   * @param value The value to be categorized.
   * @returns The category that the value falls into.
   */
  getCategory(value: unknown): Category {
    if (this.categoryThresholds) {
      validate(this.categorySet); // validated in constructor.
      return this.getCategoryByThresholds(
        this.categorySet,
        this.categoryThresholds,
        value
      );
    } else if (this.categoryValues) {
      validate(this.categorySet); // validated in constructor.
      return this.getCategoryByValues(
        this.categorySet,
        this.categoryValues,
        value
      );
    } else {
      throwValidationError(
        `${this} does not have categoryThresholds or categoryValues defined in its MetricDefinition so getCategory() cannot be used with it.`
      );
    }
  }

  private getCategoryByThresholds(
    categorySet: CategorySet,
    thresholds: number[],
    value: unknown
  ) {
    if (!isFinite(value)) {
      return categorySet.defaultCategory;
    }

    // When grading we err on the side of a lower severity grade. So we use
    // <= for descending thresholds and >= for ascending thresholds. We may
    // need to make this configurable in the future.
    const descendingThresholds =
      thresholds.length > 1 && thresholds[0] > thresholds[1];
    const comparator = descendingThresholds
      ? (a: number, b: number) => a >= b
      : (a: number, b: number) => a <= b;

    for (let i = 0; i < thresholds.length; i++) {
      if (comparator(value, thresholds[i])) {
        return categorySet.categories[i];
      }
    }

    const lastCategory = last(categorySet.categories);
    validate(lastCategory);
    return lastCategory;
  }

  private getCategoryByValues(
    categorySet: CategorySet,
    categoryValues: unknown[],
    value: unknown
  ) {
    const categoryValueIndex = categoryValues.indexOf(value);
    if (categoryValueIndex >= 0) {
      return categorySet.categories[categoryValueIndex];
    } else {
      return categorySet.defaultCategory;
    }
  }

  /**
   * Formats the provided value for display purposes, using this metric's formatting logic.
   *
   * @param value The value to be formatted.
   * @param nullValueCopy Optional copy to be used if the value is null, else an empty string will be used.
   * @returns The formatted value.
   */
  formatValue(value: unknown, nullValueCopy = ""): string {
    if (this.categoryValues) {
      const category = this.getCategory(value);
      return category.name ?? category.id;
    } else if (typeof value === "string") {
      return value;
    } else if (!isFinite(value)) {
      return nullValueCopy;
    } else {
      return value.toLocaleString(undefined, this.formatOptions);
    }
  }

  /**
   * Rounds the provided value to the appropriate number of significant digits
   * based on this metric's formatting logic.
   *
   * @param value Value to be rounded.
   * @returns Rounded value.
   */
  roundValue(value: unknown): number | null {
    if (!isFinite(value)) {
      return null;
    }

    let decimalPlaces = this.formatOptions.maximumFractionDigits ?? 1;
    if (this.formatOptions.style === "percent") {
      // The metric will be a 0.xyz ratio that needs to be multiplied by 100 before we
      // apply the desired number of decimal places, so we need to add 2.
      decimalPlaces += 2;
    }
    return Number(value.toFixed(decimalPlaces));
  }

  /**
   * Looks up the color to use for the specified value either using the defined
   * metric categories or metric thresholds.
   *
   * @param value Value to get color for.
   * @returns Color to use for value.
   */
  getColor(value: unknown): string {
    if (this.hasCategories) {
      return this.getCategory(value).color;
    } else {
      throwValidationError(
        `${this} does not have categoryThresholds or categoryValues defined in its MetricDefinition so getCategory() cannot be used with it.`
      );
    }
  }

  /** Returns a string that helps identify this metric, e.g. for debugging purposes. */
  toString(): string {
    return `[Metric(${this.id}): ${this.name}]`;
  }
}
