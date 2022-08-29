import { styled, theme } from "../../styles";
import {
  GridRows as VxGridRows,
  GridColumns as VxGridColumns,
} from "@visx/grid";
import React from "react";

export type GridRowsProps = React.ComponentProps<typeof VxGridRows> & {
  className?: string;
};

export const GridRows = styled((props: GridRowsProps) => (
  <VxGridRows fill={theme.palette.border.default} {...props} />
))``;

export const GridColumns = styled(VxGridColumns)`
  line {
    stroke: ${({ theme }) => theme.palette.common.black};
    stroke-opacity: 0.12;
  }
`;
