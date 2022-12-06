import React from "react";

import { LegendThresholdHorizontal } from "./LegendThresholdHorizontal";
import { LegendThresholdVertical } from "./LegendThresholdVertical";

export interface BaseLegendThresholdProps {
  /** Orientation of the bars */
  orientation: "horizontal" | "vertical";
  /** Height of the thermometer */
  height?: number;
  /** Width of the thermometer */
  width?: number;
  /** Border radius of the thermometer bar */
  borderRadius?: number;
  /** Whether to show the labels or not */
  showLabels?: boolean;
  currentValue?: any;
}

export interface LegendThresholdProps<T> extends BaseLegendThresholdProps {
  /** List of items representing the labels */
  items: T[];
  /** Function that returns the color of each item */
  getItemColor: (item: T, itemIndex: number) => string;
  /** Function that returns the label of each item */
  getItemLabel?: (item: T, itemIndex: number) => string;
  /** Function that returns the sublabel of each item */
  getItemSublabel?: (item: T, itemIndex: number) => string;
}

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
