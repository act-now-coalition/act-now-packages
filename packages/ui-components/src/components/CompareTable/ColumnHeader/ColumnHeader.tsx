import React from "react";
import { Typography, Stack } from "@mui/material";
import { TableCellProps, SortDirection, SortControls } from "..";
import { StyledTableCell } from "./ColumnHeader.style";

export interface ColumnHeaderProps extends TableCellProps {
  /** Element to render as column header */
  label: React.ReactNode;
  /**
   * Sort direction of the column. This prop is only used when
   * `isSortActive` is `true`.
   */
  sortDirection: SortDirection;
  /** Indicates if the table is currently sorted by this column. */
  isSortActive: boolean;
  /**
   * Handler called when the user clicks either sorting button. The
   * sortDirection parameter corresponds to the button activated by
   * the user.
   */
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
        isSortActive={isSortActive}
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
