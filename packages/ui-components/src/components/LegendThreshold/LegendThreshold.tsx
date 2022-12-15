import React from "react";

import { LegendThresholdHorizontal } from "./LegendThresholdHorizontal";
import { LegendThresholdVertical } from "./LegendThresholdVertical";

export interface BaseLegendThresholdProps {
  /**
   * Orientation of the legend.
   */
  orientation: "horizontal" | "vertical";
  /**
   * Height of the thermometer.
   * @default 265 (vertical orientation)
   * @default 20 (horizontal orientation)
   */
  height?: number;
  /**
   * Width of the thermometer.
   * @default 12 (vertical orientation)
   * @default 300 (horizontal orientation)
   */
  width?: number;
  /**
   * Border radius of the thermometer.
   * @default 6 (vertical orientation)
   * @default 10 (horizontal orientation)
   */
  borderRadius?: number;
  /**
   * Show the labels of each legend item.
   * @default true
   */
  showLabels?: boolean;
}

export interface LegendThresholdProps<T> extends BaseLegendThresholdProps {
  /**
   * Array of legend items, containing properties about each section of the legend.
   */
  items: T[];
  /**
   * Function that returns the legend item's color.
   *
   * @param item - The legend item.
   * @param itemIndex - Index of the legend item.
   */
  getItemColor: (item: T, itemIndex: number) => string;
  /**
   * Function that returns the legend item's label.
   *
   * @param item - The legend item.
   * @param itemIndex - Index of the legend item.
   */
  getItemLabel?: (item: T, itemIndex: number) => string;
  /**
   * Function that returns the legend item's sublabel.
   *
   * @param item - The legend item.
   * @param itemIndex - Index of the legend item.
   */
  getItemSublabel?: (item: T, itemIndex: number) => string;
  /**
   * Function that returns whether or not to show an indicator of the current value.
   *
   * @param item - The legend item.
   * @param itemIndex - Index of the legend item.
   */
  getItemShowIndicator?: (item: T, itemIndex: number) => boolean | undefined;
}

/**
 * LegendThreshold represents a scale with thresholds that separate a set
 * of categories, each represented by a color and labels.
 */

export const LegendThreshold = <T,>({
  showLabels = true,
  ...props
}: LegendThresholdProps<T>) => {
  return props.orientation === "horizontal" ? (
    <LegendThresholdHorizontal showLabels={showLabels} {...props} />
  ) : (
    <LegendThresholdVertical showLabels={showLabels} {...props} />
  );
};

export default LegendThreshold;
