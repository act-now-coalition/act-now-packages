import React, { useId } from "react";

import { useTheme } from "@mui/material";
import { scaleLinear } from "@visx/scale";
import sortBy from "lodash/sortBy";

import { RectClipGroup } from "../RectClipGroup";

export interface BaseMultiProgressBarProps {
  maxValue: number;
  /** Color of charted bars */
  barColor?: string;
  /** Background color of progress bar */
  bgColor?: string;
  /** For accessibility-purposes, a description of what the progress bar is displaying */
  title?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface MultiProgressBarProps<T> extends BaseMultiProgressBarProps {
  items: [T, T];
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
}

export const DEFAULT_WIDTH = 100;
export const DEFAULT_HEIGHT = 16;

export const MultiProgressBar = <T,>({
  items,
  getItemValue,
  getItemLabel,
  maxValue,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  barColor = "#000000",
  bgColor,
  borderRadius = 4,
  title,
}: MultiProgressBarProps<T>) => {
  const theme = useTheme();
  const hatchPatternId = useId();
  const titleId = useId();

  const xScale = scaleLinear({
    domain: [0, maxValue],
    range: [0, width],
  });

  /**
   * Items are sorted in descending order to ensure they are layered
   * in the correct order in the progress bar.
   * */
  const [sortedFirstItem, sortedSecondItem] = sortBy(
    items,
    (item) => getItemValue(item) * -1
  );

  return (
    <svg
      width={width}
      height={height}
      aria-labelledby={titleId}
      role="meter"
      style={{ display: "block" }}
    >
      <title id={titleId}>
        {title
          ? title
          : `A progress bar showing ${getItemLabel(
              sortedFirstItem
            )} and ${getItemLabel(sortedSecondItem)}`}
      </title>
      <defs>
        <pattern
          id={hatchPatternId}
          width="3"
          height="1"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="1"
            stroke={barColor}
            strokeWidth={1.5}
          />
        </pattern>
      </defs>

      <RectClipGroup
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
      >
        {/* Background */}
        <rect
          fill={bgColor ?? theme.palette.border.default}
          width={width}
          height={height}
        />

        {/* First sorted item (larger value, wider bar), hatched fill */}
        <rect
          key={getItemLabel(sortedFirstItem)}
          fill={`url(#${hatchPatternId})`}
          width={xScale(getItemValue(sortedFirstItem))}
          height={height}
        />

        {/* Second sorted item (smaller value, shorter bar), solid fill */}
        <rect
          key={getItemLabel(sortedSecondItem)}
          fill={barColor}
          width={xScale(getItemValue(sortedSecondItem))}
          height={height}
        />
      </RectClipGroup>
    </svg>
  );
};
