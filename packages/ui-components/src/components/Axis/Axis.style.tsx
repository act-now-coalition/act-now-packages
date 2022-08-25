import React from "react";
import { styled, theme } from "../../styles";
import {
  AxisLeft as VxAxisLeft,
  AxisBottom as VxAxisBottom,
  TickLabelProps,
} from "@visx/axis";
import typography from "../../styles/theme/typography";
import { formatDateTime, DateFormat } from "@actnowcoalition/time-utils";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  className?: string;
};

export type AxisBottomProps = React.ComponentProps<typeof VxAxisBottom> & {
  className?: string;
};

const baseTickLabelProps = {
  fill: typography.paragraphSmall.color,
  fontFamily: typography.paragraphSmall.fontFamily,
  fontSize: typography.paragraphSmall.fontSize,
  fontWeight: typography.paragraphSmall.fontWeight,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const bottomTickLabelProps: TickLabelProps<{}> = () => ({
  textAnchor: "middle", // Horizontal anchor
  verticalAnchor: "start",
  ...baseTickLabelProps,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const leftTickLabelProps: TickLabelProps<{}> = () => ({
  textAnchor: "end", // Horizontal anchor
  verticalAnchor: "middle",
  ...baseTickLabelProps,
});

const formatDate = (date: Date) => formatDateTime(date, DateFormat.MMM);

export const AxisLeft = styled((props: AxisLeftProps) => (
  <VxAxisLeft
    axisClassName={props.className ?? ""}
    numTicks={props.numTicks ?? 5}
    hideTicks={props.hideTicks ?? true}
    tickLabelProps={leftTickLabelProps}
    stroke={theme.palette.border.default}
    {...props}
  />
))``;

export const AxisBottom = styled((props: AxisBottomProps) => (
  <VxAxisBottom
    axisClassName={props.className ?? ""}
    tickLength={4}
    tickStroke={theme.palette.border.default}
    tickFormat={props.tickFormat ?? formatDate}
    tickLabelProps={bottomTickLabelProps}
    stroke={theme.palette.border.default}
    {...props}
  />
))``;
