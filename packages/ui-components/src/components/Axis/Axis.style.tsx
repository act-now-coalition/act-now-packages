import React from "react";

import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from "@visx/axis";

import { styled, theme } from "../../styles";
import typography from "../../styles/theme/typography";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  /**
   * The className applied to the outermost axis group element.
   */
  className?: string;
};

export type AxisBottomProps = React.ComponentProps<typeof VxAxisBottom> & {
  /**
   * The className applied to the outermost axis group element.
   */
  className?: string;
  /**
   * Width of AxisBottom.
   */
  width?: number;
};

const baseTickLabelProps = {
  fill: typography.paragraphSmall.color,
  fontFamily: typography.paragraphSmall.fontFamily,
  fontSize: typography.paragraphSmall.fontSize,
  fontWeight: typography.paragraphSmall.fontWeight,
};

export const AxisLeft = styled((props: AxisLeftProps) => (
  <VxAxisLeft
    axisClassName={props.className ?? ""}
    numTicks={props.numTicks ?? 5}
    hideTicks={props.hideTicks}
    tickStroke={theme.palette.border.default}
    tickLabelProps={() => ({
      textAnchor: "end", // Horizontal anchor
      verticalAnchor: "middle",
      dx: "-.25em",
      ...baseTickLabelProps,
    })}
    stroke={theme.palette.chart.axis}
    {...props}
  />
))``;

export const AxisBottom = styled((props: AxisBottomProps) => (
  <VxAxisBottom
    axisClassName={props.className ?? ""}
    tickLength={4}
    tickStroke={theme.palette.border.default}
    tickLabelProps={() => ({
      textAnchor: "middle", // Horizontal anchor
      verticalAnchor: "start",
      ...baseTickLabelProps,
    })}
    stroke={theme.palette.chart.axis}
    {...props}
  />
))``;
