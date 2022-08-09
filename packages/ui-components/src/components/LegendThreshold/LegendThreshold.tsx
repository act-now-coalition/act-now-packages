import React from "react";
import LegendThresholdHorizontal from "./LegendThresholdHorizontal";
import LegendThresholdVertical from "./LegendThresholdVertical";

export interface LegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation?: "horizontal" | "vertical";
  /** Height of the component, including the colored bars and labels. */
  height?: number;
  /**
   * Height of the colored bars. When not adding the bars, make sure that
   * `barHeight` is set to the same value as `height`.
   */
  barHeight?: number;
  /** Width of the component */
  width?: number;
  /** Border radius of the colored bars */
  borderRadius?: number;
  /** List of items representing the labels */
  items: T[];
  /** Function that returns the color of each level */
  getItemColor: (item: T, itemIndex: number) => string;
  /**
   * Note that only the labels between two levels are rendered. The last
   * end label won't be shown.
   */
  getItemEndLabel: (item: T, itemIndex: number) => string;
  /**
   * Whether to show the labels or not (true by default). Make sure to set
   * `barHeight` to `height` when not including the labels.
   */
  showLabels?: boolean;
}

/**
 * `LegendThreshold` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThreshold = <T,>({
  orientation = "horizontal",
  height,
  barHeight,
  width,
  borderRadius = 4,
  items,
  getItemColor,
  getItemEndLabel,
  showLabels = true,
  ...otherSvgProps
}: LegendThresholdProps<T> &
  Omit<React.SVGProps<SVGSVGElement>, keyof LegendThresholdProps<T>>) => {
  const props = {
    orientation,
    height,
    barHeight,
    width,
    borderRadius,
    items,
    getItemColor,
    getItemEndLabel,
    showLabels,
    ...otherSvgProps,
  };
  return orientation === "horizontal" ? (
    <LegendThresholdHorizontal {...props} />
  ) : (
    <LegendThresholdVertical {...props} />
  );
};

export default LegendThreshold;
