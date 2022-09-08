import React from "react";

import { ProgressBarContainer, StyledSvg } from "./MultiProgressBar.style";
import { formatPercent } from "@actnowcoalition/number-format";

export interface MultiProgressBarProps<T> {
  items: T[];
  bgColor: string;
  getItemColor: (item: T, itemIndex: number) => string;
  getItemLabel: (item: T, itemIndex: number) => string;
  getItemValue: (item: T, itemIndex: number) => number;
  vaccinationsInitiated: number;
  vaccinationsCompleted: number;
  width: number;
}

function getOffsetPercentage(decimal: number) {
  return formatPercent(decimal, 1);
}

export const MultiProgressBar = <T,>({
  items,
  vaccinationsInitiated,
  vaccinationsCompleted,
  getItemColor,
  getItemLabel,
  getItemValue,
  bgColor,
  width,
}: MultiProgressBarProps<T>) => {
  const height = 18;
  const color = bgColor;
  getItemColor(items[0], 0);
  getItemLabel(items[0], 0);
  getItemValue(items[0], 0);

  return (
    <ProgressBarContainer>
      <StyledSvg width={width} height={height} role="img">
        <g>
          {/* Vaccinations Completed section (solid) */}
          <rect
            fill={color}
            x={0}
            width={getOffsetPercentage(vaccinationsCompleted)}
            height={height}
          />
          {/* Vaccinations Initiated section (hatched pattern) */}
          <rect
            fill="green"
            x={getOffsetPercentage(vaccinationsCompleted)}
            width={getOffsetPercentage(
              vaccinationsInitiated - vaccinationsCompleted
            )}
            height={height}
          />
          <rect
            fill="blue"
            x={getOffsetPercentage(vaccinationsInitiated)}
            width={getOffsetPercentage(1 - vaccinationsInitiated)}
            height={height}
          />
        </g>
      </StyledSvg>
    </ProgressBarContainer>
  );
};
