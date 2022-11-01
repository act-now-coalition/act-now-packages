import React from "react";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

/**
 * Enum with the types of Series
 */
export enum SeriesType {
  LINE = "LINE",
  BAR = "BAR",
}

interface SeriesBase {
  metric: Metric;
  region: Region;
}

/**
 * The SeriesLine object will be represented as a line chart. It allows
 * to customize the line by passing the `lineProps` object.
 */
export interface SeriesLine extends SeriesBase {
  type: SeriesType.LINE;
  lineProps: Pick<
    React.SVGProps<SVGPathElement>,
    "stroke" | "strokeDasharray" | "strokeWidth"
  >;
}

/**
 * The SeriesBar object will be represented as a BarChart.
 */
export interface SeriesBar extends SeriesBase {
  type: SeriesType.BAR;
}

/**
 * Series to visually represent timeseries.
 */
export type Series = SeriesLine | SeriesBar;
