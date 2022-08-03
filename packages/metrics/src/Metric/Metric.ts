import { assert } from "@actnowcoalition/assert";
import { isNumber } from "lodash";
import { MetricDataReference } from "./MetricDataReference";
import { MetricLevel } from "./MetricLevel";

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
   * specified by {@link MetricDefinition.levelSet } and there should be one
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
   * Specifies a set of levels that this metric can be graded as (e.g. "default"
   * or "vaccine-levels").  These level sets can be specified when constructing the
   * {@link MetricCatalog}.
   */
  levelSet?: string;

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
  readonly levelSet: string;
  /** {@inheritDoc MetricDefinition.formatOptions} */
  readonly formatOptions: Intl.NumberFormatOptions;
  /** {@inheritDoc MetricDefinition.extra} */
  readonly extra?: Record<string, unknown>;

  private levels: MetricLevel[];

  /**
   * Constructs a Metric from the given definition and optional levelSets.
   * @param definition The JSON definition of the metric.
   * @param levelSets Optional `MetricLevel` sets to be used for grading. These
   * are typically provided to the {@link MetricCatalog} when it is constructed
   * and passed down when constructing `Metric`s.
   */
  constructor(
    definition: MetricDefinition,
    levelSets?: { [name: string]: MetricLevel[] }
  ) {
    this.id = definition.id;
    this.dataReference = definition.dataReference;
    this.name = definition.name ?? `${this.id}`;
    this.extendedName = definition.extendedName ?? this.name;
    this.thresholds = definition.thresholds;
    this.levelSet = definition.levelSet ?? "default";
    this.levels = levelSets?.[this.levelSet] ?? [];
    this.formatOptions = definition.formatOptions ?? DEFAULT_FORMAT_OPTIONS;

    assert(
      this.thresholds === undefined ||
        this.thresholds.length === this.levels.length - 1,
      "There should be 1 fewer thresholds than levels."
    );
  }

  /**
   * Uses this metric's grading logic (thresholds and levels) to grade the
   * provided value to a `MetricLevel`.
   *
   * @param value The value to be graded.
   * @returns The level that the value falls into.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLevel(value: unknown): MetricLevel {
    throw new Error("Not implemented");
  }

  /**
   * Formats the provided value for display purposes, using this metric's formatting logic.
   *
   * @param value The value to be formatted.
   * @param nullValueCopy Optional copy to be used if the value is null, else an empty string will be used.
   * @returns The formatted value.
   */
  formatValue(value: unknown, nullValueCopy = ""): string {
    if (!isNumber(value)) {
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
    if (!isNumber(value)) {
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
