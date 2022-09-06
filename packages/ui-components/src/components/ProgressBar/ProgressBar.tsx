import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import uniqueId from "lodash/uniqueId";
import React from "react";

export interface ProgressBarProps {
  /** Border radius of the progress bar */
  borderRadius?: number;
  /** Minimum value in the range */
  minValue?: number;
  /** Maximum value in the range */
  maxValue: number;
  /** Current progress value */
  value: number;
  /** Bar color */
  color: string;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Chart that shows a numeric value that varies within a defined range.
 *
 * Note that minValue, maxValue and currentValue should be in user units in
 * order for assistive technologies to describe the values correctly. For
 * example, to represent 35%, we should set minValue=0, maxValue=100, and
 * currentValue=35.
 *
 * By default, the role of the component is 'meter', since the role
 * 'progressbar' is appropiate to show progress of tasks.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/meter/
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/meter_role
 */
export const ProgressBar = ({
  width = 300,
  height = 16,
  borderRadius = 4,
  minValue = 0,
  maxValue,
  backgroundColor = "rgba(95, 108, 114, 0.2)",
  value,
  color,
  role = "meter",
  ...otherSvgProps
}: ProgressBarProps &
  Omit<
    React.SVGProps<SVGSVGElement>,
    "aria-valuemin" | "aria-valuemax" | "aria-valuenow"
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
      role={role}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-valuenow={value}
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
        <rect width={xScale(value)} height={height} fill={color} />
      </Group>
    </svg>
  );
};
