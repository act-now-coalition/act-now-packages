import React from "react";
import { Typography, Stack } from "@mui/material";
import { TableCellProps, SortDirection, SortControls } from "..";
import { StyledTableCell } from "./ColumnHeader.style";

export interface ColumnHeaderProps extends TableCellProps {
  label: React.ReactNode;
  sortDirection: SortDirection;
  isSortActive: boolean;
  onClickSort: (sortDirection: SortDirection) => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  sortDirection,
  isSortActive,
  onClickSort,
  ...tableCellProps
}) => (
  <StyledTableCell stickyRow isSortActive={isSortActive} {...tableCellProps}>
    <Stack alignItems={tableCellProps.align === "right" ? "end" : "start"}>
      {renderLabel(label)}
      <SortControls
        active={isSortActive}
        sortDirection={sortDirection}
        onClick={onClickSort}
      />
    </Stack>
  </StyledTableCell>
);

function renderLabel(label: React.ReactNode): React.ReactNode {
  return typeof label === "string" ? (
    <Typography variant="labelSmall" color="inherit">
      {label}
    </Typography>
  ) : (
    label
  );
}
