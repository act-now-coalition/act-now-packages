import last from "lodash/last";
import isEqual from "lodash/isEqual";

import { assert } from "@actnowcoalition/assert";
import { isFinite } from "@actnowcoalition/number-format";

import { MetricDataReference } from "./MetricDataReference";
import { MetricLevel, MetricLevelSet } from "./MetricLevel";

/** Default format options used for metrics that don't specify any. */
const DEFAULT_FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: 1,
};

/**
 * A set of parameters that define a given metric (name, data source, thresholds, etc.)
 *
 * All parameters are optional and should be omitted if default values are okay.
 *
 * The definition is specified using pure JSON types so that it could be read
 * from a file or CMS.
 */
export interface MetricDefinition {
  /** A unique ID that can be used to reference this metric (e.g. "cases_per_100k"). */
  id: string;

  /** Specifies how to fetch data for this metric.  See {@link MetricDataReference} and {@link MetricDataProvider} */
  dataReference?: MetricDataReference;

  /** The default user-facing display name of the metric (e.g. "Cases per 100k"). */
  name?: string;

  /**
   * A longer name for the metric used when space is not a concern (e.g. "Cases
   * per 100k population")
   */
  extendedName?: string;

  /**
   * Thresholds used for grading the metric. These correspond to the levels
   * specified by {@link MetricDefinition.levelSetId } and there should be one
   * fewer threshold than there are levels.
   *
   * Example:
   * ```
   *   // Assuming levels are [low, medium, high]
   *   thresholds: [10, 20]
   *   // then <=10 is low, 10.1-20 is medium, and >20 is high.
   *
   *   // Thresholds can be descending as well.
   *   thresholds: [20, 10]
   *   // then >=20 is low, 10-19.9 is medium, and <10 is high.
   * ```
   */
  thresholds?: number[];

  /**
   * References a set of levels that this metric should use for grading (e.g.
   * "default" or "vaccine-levels"). The available { @see MetricLevelSet }
   * definitions are defined when constructing the {@link MetricCatalog}.
   */
  levelSetId?: string;

  /**
   * Specifies options used to format the metric value when it is displayed.
   */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Arbitrary extra metadata related to the metric. This is not used by any
   * bultin @actnowcoalition packages but can be used for custom application
   * metadata that's useful to tie to the metric.
   */
  extra?: Record<string, unknown>;
}

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
  /** @inheritDoc MetricDefinition.levelSet */
  readonly levelSetId: string;
  /** {@inheritDoc MetricDefinition.formatOptions} */
  readonly formatOptions: Intl.NumberFormatOptions;
  /** {@inheritDoc MetricDefinition.extra} */
  readonly extra?: Record<string, unknown>;

  /**
   * The set of levels this metric can be graded as. Populated from { @see
   * MetricDefinition.lvelSet}.
   */
  readonly levelSet?: MetricLevelSet;

  /**
   * Constructs a Metric from the given definition and optional levelSets.
   * @param definition The JSON definition of the metric.
   * @param levelSets Optional list of the available `MetricLevelSet` instances.
   * These are typically provided to the {@link MetricCatalog} when it is
   * constructed which passes them down to here constructing `Metric` objects.
   */
  constructor(definition: MetricDefinition, levelSets?: MetricLevelSet[]) {
    this.id = definition.id;
    this.dataReference = definition.dataReference;
    this.name = definition.name ?? `${this.id}`;
    this.extendedName = definition.extendedName ?? this.name;
    this.thresholds = definition.thresholds;
    this.levelSetId = definition.levelSetId ?? "default";
    this.levelSet = (levelSets || []).find((ls) => ls.id === this.levelSetId);
    this.formatOptions = definition.formatOptions ?? DEFAULT_FORMAT_OPTIONS;

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
   * Formats the provided value for display purposes, using this metric's formatting logic.
   *
   * @param value The value to be formatted.
   * @param nullValueCopy Optional copy to be used if the value is null, else an empty string will be used.
   * @returns The formatted value.
   */
  formatValue(value: unknown, nullValueCopy = ""): string {
    if (!isFinite(value)) {
      // TODO(michael): Pass string values through as-is?
      return nullValueCopy;
    }
    return value.toLocaleString(undefined, this.formatOptions);
  }

  /**
   * Rounds the provided value to the appropriate number of significant digits
   * based on this metric's formatting logic.
   *
   * @param value Value to be rounded.
   * @returns Rounded value.
   */
  roundValue(value: unknown): number | null {
    // TODO(michael) Deal with non-number data?
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
