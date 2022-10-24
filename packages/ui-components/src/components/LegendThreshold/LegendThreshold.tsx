import React from "react";
import { LegendThresholdHorizontal } from "./LegendThresholdHorizontal";
import { LegendThresholdVertical } from "./LegendThresholdVertical";
import { LegendThresholdProps } from "./interfaces";

/**
 * `LegendThreshold` represents a scale with thresholds that separate
 * a set of categories. By default, the labels between each category are shown.
 */

export const LegendThreshold = <T,>(props: LegendThresholdProps<T>) => {
  return props.orientation === "horizontal" ? (
    <LegendThresholdHorizontal {...props} />
  ) : (
    <LegendThresholdVertical {...props} />
  );
};

export default LegendThreshold;
