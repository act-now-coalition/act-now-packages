import React from "react";
import { css } from "@emotion/react";
import { styled, theme } from "../../styles";
import { AxisLeft as VxAxisLeft, AxisBottom as VxAxisBottom } from "@visx/axis";

export type AxisLeftProps = React.ComponentProps<typeof VxAxisLeft> & {
  className?: string;
};

export type AxisBottomProps = React.ComponentProps<typeof VxAxisBottom> & {
  className?: string;
};

export const cssTextAxis = css`
  font-size: 0.875rem;
  fill: ${theme.palette.text.secondary};
`;

export const AxisLeft = styled((props: AxisLeftProps) => (
  <VxAxisLeft axisClassName={props.className ?? ""} {...props} />
))`
  text,
  .visx-axis-label tspan {
    ${cssTextAxis}
  }
`;

export const AxisBottom = styled((props: AxisBottomProps) => (
  <VxAxisBottom axisClassName={props.className ?? ""} {...props} />
))`
  text,
  .visx-axis-label tspan {
    ${cssTextAxis}
  }
`;
