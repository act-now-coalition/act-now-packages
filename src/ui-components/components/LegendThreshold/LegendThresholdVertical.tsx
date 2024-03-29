import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { LegendThresholdProps } from "./LegendThreshold";
import { LegendColor } from "./LegendThreshold.style";

/**
 * LegendThresholdVertical is the implementation of LegendThreshold with orientation "vertical".
 */

export const LegendThresholdVertical = <T,>({
  height = 265,
  width = 12,
  borderRadius = 6,
  showLabels,
  items,
  getItemColor,
  getItemLabel,
  getItemSublabel,
}: LegendThresholdProps<T>) => {
  const numberOfItems = items.length;
  const legendColorHeight = height / numberOfItems;
  // Reverse the order of the items so that the lowest categories are rendered at the bottom.
  const orderedItems = items.slice().reverse();
  return (
    <Box width="fit-content">
      {orderedItems.map((item, itemIndex) => (
        <Box key={itemIndex} height={legendColorHeight} display="flex">
          <LegendColor
            style={{
              width,
              backgroundColor: getItemColor(item, itemIndex),
            }}
            roundTop={itemIndex === 0 ? borderRadius : 0}
            roundBottom={itemIndex === numberOfItems - 1 ? borderRadius : 0}
          />
          {showLabels && (
            <Stack ml={2} spacing={0.25} justifyContent="center">
              {getItemLabel && (
                <>
                  <Typography variant="labelSmall">
                    {getItemLabel(item, itemIndex)}
                  </Typography>
                  {getItemSublabel && (
                    <Typography variant="paragraphSmall">
                      {getItemSublabel(item, itemIndex)}
                    </Typography>
                  )}
                </>
              )}
            </Stack>
          )}
        </Box>
      ))}
    </Box>
  );
};
