import React, { useId } from "react";
import sortBy from "lodash/sortBy";
import { useTheme } from "@mui/material";
import { RectClipGroup } from "../RectClipGroup";
import { scaleLinear } from "@visx/scale";
import { MultiProgressBarProps } from "./interfaces";

export const MultiProgressBar = <T,>({
  items,
  getItemValue,
  getItemLabel,
  maxValue,
  width = 100,
  height = 16,
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
    <svg width={width} height={height} aria-labelledby={titleId} role="meter">
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
