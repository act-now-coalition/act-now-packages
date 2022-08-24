import React from "react";
import { styled, theme } from "../../styles";
import {
  AxisLeft as VxAxisLeft,
  AxisBottom as VxAxisBottom,
  TickLabelProps,
} from "@visx/axis";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  className?: string;
};

export type AxisBottomProps = React.ComponentProps<typeof VxAxisBottom> & {
  className?: string;
};

const baseTickLabelProps = {
  fill: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
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

export const AxisLeft = styled((props: AxisLeftProps) => (
  <VxAxisLeft axisClassName={props.className ?? ""} {...props} />
))``;

export const AxisBottom = styled((props: AxisBottomProps) => (
  <VxAxisBottom axisClassName={props.className ?? ""} {...props} />
))``;
