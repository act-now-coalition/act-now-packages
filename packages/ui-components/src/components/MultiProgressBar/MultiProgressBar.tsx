import React from "react";
import sortBy from "lodash/sortBy";
import { useTheme } from "@mui/material";
import { RectClipGroup } from "../RectClipGroup";
import { scaleLinear } from "@visx/scale";
import { MultiProgressBarProps } from "./interfaces";

export const MultiProgressBar = <T,>({
  items,
  getItemColor,
  getItemValue,
  maxValue,
  width = 100,
  height = 16,
  bgColor,
  borderRadius = 4,
}: MultiProgressBarProps<T>) => {
  // TODO (Fai): Incorporate aria-labels and/or accessibility attributes.

  const theme = useTheme();

  const xScale = scaleLinear({
    domain: [0, maxValue],
    range: [0, width],
  });

  /**
   * Items are sorted in descending order to ensure they are layered
   * in the correct order in the progress bar.
   * */
  const sortedItems = sortBy(items, (item) => getItemValue(item) * -1);

  return (
    <svg width={width} height={height}>
      <RectClipGroup
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
      >
        <rect
          fill={bgColor ?? theme.palette.border.default}
          width={width}
          height={height}
        />
        {sortedItems.map((item) => {
          return (
            <rect
              /**
               * Using index as key can trigger unexpected behavior.
               * More info: https://reactjs.org/docs/lists-and-keys.html
               */
              key={getItemColor(item)}
              fill={getItemColor(item)}
              width={xScale(getItemValue(item))}
              height={height}
            />
          );
        })}
      </RectClipGroup>
    </svg>
  );
};
