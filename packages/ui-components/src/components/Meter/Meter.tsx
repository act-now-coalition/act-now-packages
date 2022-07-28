import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import uniqueId from "lodash/uniqueId";
import React from "react";

export interface MeterProps {
  borderRadius?: number;
  minValue: number;
  maxValue: number;
  currentValue: number;
  currentColor: string;
  backgroundColor?: string;
}

/**
 * Graphical display of a numeric value that varies within a defined range. Examples
 *
 * - use user units for values. For example when using percentages, set
 *   minValue=0, maxValue=100, currentValue=39 to represent 39%.
 * - use aria-label, aria-labelledby or title to indicate what the meter
 *   represents
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/meter/
 */
const Meter = ({
  width = 300,
  height = 16,
  borderRadius = 4,
  minValue,
  maxValue,
  backgroundColor = "rgba(95, 108, 114, 0.2)",
  currentValue,
  currentColor,
  ...otherSvgProps
}: MeterProps &
  Omit<
    React.SVGProps<SVGSVGElement>,
    "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"
  >) => {
  const xScale = scaleLinear({
    domain: [minValue, maxValue],
    range: [0, width],
  });

  const clipPathId = uniqueId(`rounded-borders-clippath-`);

  return (
    <svg
      width={width}
      height={height}
      role="meter"
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuenow={currentValue}
      {...otherSvgProps}
    >
      <defs>
        <clipPath id={clipPathId}>
          <rect
            y={0}
            width={width}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
          />
        </clipPath>
      </defs>
      <Group clipPath={`url(#${clipPathId})`}>
        <rect width={width} height={height} fill={backgroundColor} />
        <rect
          width={xScale(currentValue)}
          height={height}
          fill={currentColor}
        />
      </Group>
    </svg>
  );
};

export default Meter;
