import React from "react";

import { scaleLinear } from "@visx/scale";

import { RectClipGroup } from "../RectClipGroup";

export interface ProgressBarProps {
  /**
   * Width of the progress bar.
   * @default 300
   */
  width?: number;
  /**
   * Height of the progress bar.
   * @default 16
   */
  height?: number;
  /**
   * Border radius of the progress bar.
   * @default 4
   */
  borderRadius?: number;
  /**
   * Minimum value of the progress bar's range.
   * @default 0
   */
  minValue?: number;
  /**
   * Maximum value of the progress bar's range.
   */
  maxValue: number;
  /**
   * Current progress value.
   */
  value: number;
  /**
   * Color of the progress bar's charted bar.
   */
  color: string;
  /**
   * Background color of the progress bar.
   * @default "rgba(95, 108, 114, 0.2)"
   */
  backgroundColor?: string;
}

/**
 * ProgressBar is a chart that shows a numeric value that varies within a defined range.
 *
 * Note that `minValue`, `maxValue` and `currentValue` should be in user units in
 * order for assistive technologies to describe the values correctly.
 * Example: to represent 35%, set minValue=0, maxValue=100, and currentValue=35.
 */

export const ProgressBar = ({
  width = 300,
  height = 16,
  borderRadius = 4,
  minValue = 0,
  maxValue,
  backgroundColor = "rgba(95, 108, 114, 0.2)",
  value,
  color,
  ...otherSvgProps
}: ProgressBarProps) => {
  const xScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [0, width],
  });

  return (
    <svg
      width={width}
      height={height}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuenow={value}
      {...otherSvgProps}
    >
      <RectClipGroup
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
      >
        <rect width={width} height={height} fill={backgroundColor} />
        <rect width={xScale(value)} height={height} fill={color} />
      </RectClipGroup>
    </svg>
  );
};
