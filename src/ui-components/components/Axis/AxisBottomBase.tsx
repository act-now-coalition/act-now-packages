import React from "react";

import { useTheme } from "@mui/material";
import { AxisBottom as VxAxisBottom } from "@visx/axis";

export type AxisBottomBaseProps = React.ComponentProps<typeof VxAxisBottom> & {
  /**
   * Class name applied to the outermost axis group element.
   */
  className?: string;
};

export const AxisBottomBase = (props: AxisBottomBaseProps) => {
  const theme = useTheme();
  return (
    <VxAxisBottom
      axisClassName={props.className ?? ""}
      tickLength={4}
      tickStroke={theme.palette.chart.axis}
      tickLabelProps={() => ({
        textAnchor: "middle",
        verticalAnchor: "start",
        fill: theme.palette.chart.axisLabel,
        fontFamily: theme.typography.paragraphSmall.fontFamily,
        fontSize: theme.typography.paragraphSmall.fontSize,
        fontWeight: theme.typography.paragraphSmall.fontWeight,
      })}
      stroke={theme.palette.chart.axis}
      {...props}
    />
  );
};
