import React from "react";
import {
  LegendThresholdHorizontal,
  LegendThresholdHorizontalProps,
} from "./LegendThresholdHorizontal";
import {
  LegendThresholdVertical,
  LegendThresholdVerticalProps,
} from "./LegendThresholdVertical";

export type LegendThresholdProps<T> =
  | LegendThresholdHorizontalProps<T>
  | LegendThresholdVerticalProps<T>;

/**
 * `LegendThreshold` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
export const LegendThreshold = <T,>(props: LegendThresholdProps<T>) => {
  return props.orientation === "horizontal" ? (
    <LegendThresholdHorizontal {...props} />
  ) : (
    <LegendThresholdVertical {...props} />
  );
};

export default LegendThreshold;
