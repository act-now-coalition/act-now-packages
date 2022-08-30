import { styled, theme } from "../../styles";
import {
  GridRows as VxGridRows,
  GridColumns as VxGridColumns,
} from "@visx/grid";
import React from "react";

export type GridRowsProps = React.ComponentProps<typeof VxGridRows>;

export type GridColumnsProps = React.ComponentProps<typeof VxGridColumns>;

export const GridRows = styled((props: GridRowsProps) => (
  <VxGridRows stroke={theme.palette.border.default} {...props} />
))``;

export const GridColumns = styled((props: GridColumnsProps) => (
  <VxGridColumns stroke={theme.palette.border.default} {...props} />
))``;
