import React from "react";
import Stack from "@mui/material/Stack";
import { Square, Label } from "./LegendCategorical.style";

export interface LegendCategoricalProps<T> {
  /** Array of items representing legend items */
  items: T[];
  /** Function that returns the color of each legend item */
  getItemColor: (item: T, itemIndex: number) => string;
  /** Function that returns the label of each legend item */
  getItemLabel: (item: T, itemIndex: number) => string;
}

/**
 * LegendCategorical represents a legend of items, each with a color block and a corresponding label.
 */
const LegendCategorical = <T,>({
  items,
  getItemColor,
  getItemLabel,
}: LegendCategoricalProps<T>) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1.5, md: 2.5 }}
    >
      {items.map((item: T, itemIndex: number) => {
        return (
          <Stack direction="row" alignItems="center" key={`item-${itemIndex}`}>
            <Square color={getItemColor(item, itemIndex)} />
            <Label>{getItemLabel(item, itemIndex)}</Label>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default LegendCategorical;
