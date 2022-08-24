import last from "lodash/last";
import isEqual from "lodash/isEqual";

import { assert } from "@actnowcoalition/assert";
import { isFinite } from "@actnowcoalition/number-format";

import { MetricDataReference } from "./MetricDataReference";
import { MetricLevel, MetricLevelSet } from "./MetricLevel";
import { MetricCategory } from "./MetricCategory";
import { MetricDefinition } from "./MetricDefinition";
import { MetricCatalogOptions } from "../MetricCatalog";

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
 * see e.g. {@link MetricCatalog.fetchData} or {@link MetricCatalog.useData}.
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
  /** {@inheritDoc MetricDefinition.thresholds} */
  readonly thresholds?: number[];
  /** @inheritDoc MetricDefinition.levelSetId */
  readonly levelSetId: string;
  /** {@inheritDoc MetricDefinition.formatOptions} */
  readonly formatOptions: Intl.NumberFormatOptions;
  /** {@inheritDoc MetricDefinition.categories} */
  readonly categories?: Array<MetricCategory>;
  /** {@inheritDoc MetricDefinition.extra} */
  readonly extra?: Record<string, unknown>;

  /**
   * The set of levels this metric can be graded as. Populated from { @link
   * MetricDefinition.levelSetId }.
   */
  readonly levelSet?: MetricLevelSet;

  /**
   * Constructs a Metric from the given definition and optional levelSets.
   * @param definition The JSON definition of the metric.
   * @param levelSets Optional list of the available `MetricLevelSet` instances.
   * These are typically provided to the {@link MetricCatalog} when it is
   * constructed which passes them down to here constructing `Metric` objects.
   */
  constructor(
    definition: MetricDefinition,
    catalogOptions?: MetricCatalogOptions
  ) {
    const levelSets = catalogOptions?.metricLevelSets;
    const metricDefaults = catalogOptions?.metricDefaults;

    // Apply any metric defaults from the catalog.
    const def = { ...metricDefaults, ...definition };

    this.id = def.id;
    this.dataReference = def.dataReference;
    this.name = def.name ?? `${this.id}`;
    this.extendedName = def.extendedName ?? this.name;
    this.thresholds = def.thresholds;
    this.levelSetId = def.levelSetId ?? "default";
    this.levelSet = (levelSets || []).find((ls) => ls.id === this.levelSetId);
    this.formatOptions = def.formatOptions ?? DEFAULT_FORMAT_OPTIONS;
    this.categories = def.categories;

    assert(
      !(this.categories && this.thresholds),
      "Categories and levels should not both be defined."
    );

    assert(
      this.thresholds === undefined ||
        (this.levelSet &&
          this.thresholds.length === this.levelSet.levels.length - 1),
      "There should be 1 fewer thresholds than levels."
    );

    if (this.thresholds) {
      const sorted = this.thresholds.slice().sort();
      const sortedReverse = sorted.slice().reverse();
      assert(
        isEqual(sorted, this.thresholds) ||
          isEqual(this.thresholds, sortedReverse),
        "Thresholds must be sorted ascending or descending."
      );
    }
  }

  /**
   * Indicates if the thresholds used for grading this metric are descending
   * (i.e. higher values ==> lower levels).
   */
  get areThresholdsDescending() {
    return (
      this.thresholds !== undefined &&
      this.thresholds.length > 1 &&
      this.thresholds[0] > this.thresholds[1]
    );
  }

  /**
   * Uses this metric's grading logic (thresholds and levels) to grade the
   * provided value to a `MetricLevel`.
   *
   * @param value The value to be graded.
   * @returns The level that the value falls into.
   */
  getLevel(value: unknown): MetricLevel {
    assert(
      this.levelSet !== undefined,
      "No level set defined for this metric."
    );
    if (!this.thresholds || !isFinite(value)) {
      return this.levelSet.defaultLevel;
    }

    // When grading we err on the side of a lower severity grade. So we use
    // <= for descending thresholds and >= for ascending thresholds. We may
    // need to make this configurable in the future.
    const comparator = this.areThresholdsDescending
      ? (a: number, b: number) => a >= b
      : (a: number, b: number) => a <= b;

    for (let i = 0; i < this.thresholds.length; i++) {
      if (comparator(value, this.thresholds[i])) {
        return this.levelSet.levels[i];
      }
    }

    const lastLevel = last(this.levelSet.levels);
    assert(lastLevel);
    return lastLevel;
  }

  /**
   * Finds the corresponding category for a given value.
   *
   * Throws an error if no matching category is found.
   *
   * @param value Value to find category for.
   * @returns Category the value belongs to.
   */
  getCategory(value: unknown): MetricCategory {
    assert(
      this.categories !== undefined,
      "No categories defined for this metric."
    );
    const category = this.categories.find(
      (category) => value === category.value
    );
    assert(category, `No matching category found for value ${value}.`);
    return category;
  }

  /**
   * Formats the provided value for display purposes, using this metric's formatting logic.
   *
   * @param value The value to be formatted.
   * @param nullValueCopy Optional copy to be used if the value is null, else an empty string will be used.
   * @returns The formatted value.
   */
  formatValue(value: unknown, nullValueCopy = ""): string {
    if (typeof value === "string") {
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

  /** Returns a string that helps identify this metric, e.g. for debugging purposes. */
  toString(): string {
    return `[Metric(${this.id}): ${this.name}]`;
  }
}
