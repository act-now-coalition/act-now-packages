import React from "react";

import { scaleLinear } from "@visx/scale";

import { RectClipGroup } from "../RectClipGroup";

export interface ProgressBarProps {
  /** Width of the progress bar */
  width?: number;
  /** Height of the progress bar */
  height?: number;
  /** Border radius of the progress bar */
  borderRadius?: number;
  /** Minimum value in the range */
  minValue?: number;
  /** Maximum value in the range */
  maxValue: number;
  /** Current progress value */
  value: number;
  /** Bar color */
  color: string;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Chart that shows a numeric value that varies within a defined range.
 *
 * Note that minValue, maxValue and currentValue should be in user units in
 * order for assistive technologies to describe the values correctly. For
 * example, to represent 35%, we should set minValue=0, maxValue=100, and
 * currentValue=35.
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
