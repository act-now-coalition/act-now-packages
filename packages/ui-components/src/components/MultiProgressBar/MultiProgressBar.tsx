import React, { Fragment } from "react";
import { ProgressBarContainer, StyledSvg } from "./MultiProgressBar.style";
import { formatPercent } from "@actnowcoalition/number-format";
import sortBy from "lodash/sortBy";
import { useTheme } from "@mui/material";

export interface MultiProgressBarProps<T> {
  items: T[];
  getItemColor: (item: T) => string;
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
  width?: number;
  height?: number;
  bgColor?: string;
}

function getOffsetPercentage(decimal: number) {
  return formatPercent(decimal, 1);
}

export const MultiProgressBar = <T,>({
  items,
  getItemColor,
  getItemValue,
  width = 100,
  height = 16,
  bgColor,
}: MultiProgressBarProps<T>) => {
  // TODO (Fai): Incorporate aria-labels and/or accessibility attributes.

  const theme = useTheme();

  const sortedItems = sortBy(items, (item) => getItemValue(item) * -1);

  return (
    <ProgressBarContainer width={width}>
      <StyledSvg width={width} height={height}>
        <Fragment>
          <rect
            fill={bgColor ?? theme.palette.border.default}
            x={0}
            width={width}
            height={height}
          />
          {sortedItems.map((item, i) => {
            return (
              <rect
                key={`item-${i}`}
                fill={getItemColor(item)}
                x={0}
                width={getOffsetPercentage(getItemValue(item))}
                height={height}
              />
            );
          })}
        </Fragment>
      </StyledSvg>
    </ProgressBarContainer>
  );
};
