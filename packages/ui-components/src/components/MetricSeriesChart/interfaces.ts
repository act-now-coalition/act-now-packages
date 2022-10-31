import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import React from "react";

/**
 *
 */
export enum SeriesType {
  LINE = "LINE",
  THRESHOLDS = "THRESHOLDS",
  BAR = "BAR",
}

interface SeriesBase {
  metric: Metric;
  region: Region;
}

/**
 *
 */
export interface SeriesLine extends SeriesBase {
  type: SeriesType.LINE;
  lineProps: Pick<
    React.SVGProps<SVGPathElement>,
    "stroke" | "strokeDasharray" | "strokeWidth"
  >;
}

/**
 *
 */
export interface SeriesThresholds extends SeriesBase {
  type: SeriesType.THRESHOLDS;
}

/**
 *
 */
export interface SeriesBar extends SeriesBase {
  type: SeriesType.BAR;
}

/**
 *
 */
export type Series = SeriesLine | SeriesThresholds | SeriesBar;
