import React from "react";
import { CommonLegendThresholdProps } from "./interfaces";
import {
  LegendThresholdVerticalWrapper,
  LegendContainer,
  LegendColor,
  LegendLabelContainer,
} from "./LegendThreshold.style";
import { Typography } from "@mui/material";

export interface LegendThresholdVerticalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "vertical";
  /** Width of the bars (12 by default) */
  barWidth?: number;
  /** Secondary labels for each item */
  getItemSublabel?: (item: T, itemIndex: number) => string;
}

/**
 * `LegendThresholdVertical` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
export const LegendThresholdVertical = <T,>({
  height = 265,
  barWidth = 12,
  borderRadius = 6,
  showLabels = true,
  items,
  getItemColor,
  getItemLabel,
  getItemSublabel,
}: LegendThresholdVerticalProps<T>) => {
  const numberOfItems = items.length;
  const legendColorHeight = height / numberOfItems;
  // Reverse the order of the items so that the lowest levels are rendered at the bottom.
  const orderedItems = items.slice().reverse();
  return (
    <LegendThresholdVerticalWrapper>
      {orderedItems.map((item, itemIndex) => (
        <LegendContainer key={itemIndex} style={{ height: legendColorHeight }}>
          <LegendColor
            style={{
              width: barWidth,
              backgroundColor: getItemColor(item, itemIndex),
            }}
            roundTop={itemIndex === 0 ? borderRadius : 0}
            roundBottom={itemIndex === numberOfItems - 1 ? borderRadius : 0}
          />
          {showLabels && (
            <LegendLabelContainer>
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
            </LegendLabelContainer>
          )}
        </LegendContainer>
      ))}
    </LegendThresholdVerticalWrapper>
  );
};
