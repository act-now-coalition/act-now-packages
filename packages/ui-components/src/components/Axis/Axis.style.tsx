import React from "react";

import { useTheme } from "@mui/material";
import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from "@visx/axis";

import { styled } from "../../styles";
import typography from "../../styles/theme/typography";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  /**
   * Class name applied to the outermost axis group element.
   */
  className?: string;
};

export type AxisBottomProps = React.ComponentProps<typeof VxAxisBottom> & {
  /**
   * Class name applied to the outermost axis group element.
   */
  className?: string;
  /**
   * Width of AxisBottom.
   */
  width?: number;
};

const baseTickLabelProps = {
  fontFamily: typography.paragraphSmall.fontFamily,
  fontSize: typography.paragraphSmall.fontSize,
  fontWeight: typography.paragraphSmall.fontWeight,
};

export const AxisLeft = styled((props: AxisLeftProps) => {
  const theme = useTheme();
  return (
    <VxAxisLeft
      axisClassName={props.className ?? ""}
      numTicks={props.numTicks ?? 5}
      hideTicks={props.hideTicks}
      tickStroke={theme.palette.chart.axis}
      tickLabelProps={() => ({
        textAnchor: "end", // Horizontal anchor
        verticalAnchor: "middle",
        dx: "-.25em",
        fill: theme.palette.chart.axisLabel,
        ...baseTickLabelProps,
      })}
      stroke={theme.palette.chart.axis}
      {...props}
    />
  );
})``;

export const AxisBottom = styled((props: AxisBottomProps) => {
  const theme = useTheme();
  return (
    <VxAxisBottom
      axisClassName={props.className ?? ""}
      tickLength={4}
      tickStroke={theme.palette.chart.axis}
      tickLabelProps={() => ({
        textAnchor: "middle", // Horizontal anchor
        verticalAnchor: "start",
        fill: theme.palette.chart.axisLabel,
        ...baseTickLabelProps,
      })}
      stroke={theme.palette.chart.axis}
      {...props}
    />
  );
})``;
