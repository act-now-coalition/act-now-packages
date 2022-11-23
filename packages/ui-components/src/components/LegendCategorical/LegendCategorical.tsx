import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

import { Square } from "./LegendCategorical.style";

export interface LegendCategoricalProps<T> {
  /** Array of items representing legend items */
  items: T[];
  /** Function that returns the color of each legend item */
  getItemColor: (item: T, itemIndex: number) => string;
  /** Function that returns the label of each legend item */
  getItemLabel: (item: T, itemIndex: number) => string;
  /**
   * Whether or not the legend items are oriented horizontally (in a row) on desktop screens ('md' and wider).
   * Defaults to true. If false, the legend items will be oriented vertically/in a column.
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * LegendCategorical represents a legend of items, each with a color block and a corresponding label.
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
