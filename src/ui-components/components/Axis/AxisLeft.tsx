import React from "react";

import { useTheme } from "@mui/material";
import { AxisLeft as VxAxisLeft } from "@visx/axis";

import { styled } from "../../styles";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  /**
   * Class name applied to the outermost axis group element.
   */
  className?: string;
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
        textAnchor: "end",
        verticalAnchor: "middle",
        dx: "-.25em",
        fill: theme.palette.chart.axisLabel,
        fontFamily: theme.typography.paragraphSmall.fontFamily,
        fontSize: theme.typography.paragraphSmall.fontSize,
        fontWeight: theme.typography.paragraphSmall.fontWeight,
      })}
      stroke={theme.palette.chart.axis}
      {...props}
    />
  );
})``;
