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
  getItemColor,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItemLabel,
  getItemValue,
  bgColor,
  width,
}: MultiProgressBarProps<T>) => {
  const height = 18;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const color = bgColor;

  items.sort(
    (a, b) =>
      getItemValue(b, items.indexOf(b)) - getItemValue(a, items.indexOf(a))
  );

  return (
    <ProgressBarContainer>
      <StyledSvg width={width} height={height} role="img">
        <g>
          {items.map((item, i) => {
            return (
              <rect
                key={`item-${i}`}
                fill={getItemColor(item, i)}
                x={0}
                width={getOffsetPercentage(getItemValue(item, i))}
                height={height}
              />
            );
          })}
        </g>
      </StyledSvg>
    </ProgressBarContainer>
  );
};
