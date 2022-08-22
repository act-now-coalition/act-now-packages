import React from "react";
import { CommonLegendThresholdProps } from "./interfaces";
import {
  LegendThresholdVerticalWrapper,
  LegendContainer,
  LegendColor,
  LegendLabelContainer,
  LegendLabel,
  LegendSublabel,
} from "./LegendThreshold.style";

export interface LegendThresholdVerticalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "vertical";
  getItemSublabel?: (item: T, itemIndex: number) => string;
}

/**
 * `LegendThresholdVertical` represents a scale with thresholds that separate
 * a set of levels. By default, the labels between each level are shown.
 */
const LegendThresholdVertical = <T,>({
  height = 265,
  width = 12,
  borderRadius = 0,
  showLabels = true,
  items,
  getItemColor,
  getItemLabel,
  getItemSublabel,
}: LegendThresholdVerticalProps<T>) => {
  const numberOfItems = items.length;
  const legendColorHeight = height / numberOfItems;
  return (
    <LegendThresholdVerticalWrapper $height={height}>
      {items.map((item, itemIndex) => (
        <LegendContainer
          key={getItemColor(item, itemIndex)}
          $height={legendColorHeight}
        >
          <LegendColor
            $width={width}
            $color={getItemColor(item, itemIndex)}
            $roundTop={itemIndex === 0 ? borderRadius : 0}
            $roundBottom={itemIndex === numberOfItems - 1 ? borderRadius : 0}
          />
          {showLabels && (
            <LegendLabelContainer>
              {getItemLabel && (
                <>
                  <LegendLabel>{getItemLabel(item, itemIndex)}</LegendLabel>
                  {getItemSublabel && (
                    <LegendSublabel>
                      {getItemSublabel(item, itemIndex)}
                    </LegendSublabel>
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

export default LegendThresholdVertical;
