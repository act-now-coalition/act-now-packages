import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Square } from "./LegendCategorical.style";

export interface LegendCategoricalProps<T> {
  /**
   * Array of legend items, containing properties about each section of the legend.
   */
  items: T[];
  /**
   * Function that returns the legend item's color.
   *
   * @param T - item The legend item.
   * @param itemIndex - Index of the legend item.
   * @returns item color
   */
  getItemColor: (item: T, itemIndex: number) => string;
  /**
   * Function that returns the legend item's label.
   *
   * @param item - The legend item.
   * @param itemIndex - Index of the legend item.
   */
  getItemLabel: (item: T, itemIndex: number) => string;
  /**
   * Orientation of the legend.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * LegendCategorical represents a legend of items,
 * each with a color block and a corresponding label.
 */

export const LegendCategorical = <T,>({
  items,
  getItemColor,
  getItemLabel,
  orientation = "horizontal",
}: LegendCategoricalProps<T>) => {
  const isHorizontalOrientation = orientation === "horizontal";
  const desktopLegendOrientation = isHorizontalOrientation ? "row" : "column";
  const desktopLegendSpacing = isHorizontalOrientation ? 2.5 : 1.5;
  return (
    <Stack
      direction={{ xs: "column", md: desktopLegendOrientation }}
      spacing={{ xs: 1.5, md: desktopLegendSpacing }}
    >
      {items.map((item: T, itemIndex: number) => {
        return (
          <Stack direction="row" alignItems="center" key={`item-${itemIndex}`}>
            <Square color={getItemColor(item, itemIndex)} />
            <Typography variant="paragraphSmall">
              {getItemLabel(item, itemIndex)}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
