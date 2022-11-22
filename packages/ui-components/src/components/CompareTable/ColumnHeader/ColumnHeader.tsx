import React from "react";
import isNil from "lodash/isNil";
import { Typography, Stack } from "@mui/material";
import { TableCellProps, SortDirection, SortControls } from "..";
import { StyledTableCell } from "./ColumnHeader.style";

export interface ColumnHeaderProps extends TableCellProps {
  /** Element to render as column header */
  label: React.ReactNode;
  /**
   * Sort direction of the column. If sortDirection is undefined, the
   * column header will render as not sorted (sort buttons not highlighted).
   */
  sortDirection?: SortDirection;
  /**
   * Handler called when the user clicks either sorting button. The
   * sortDirection parameter corresponds to the button activated by
   * the user.
   */
  onClickSort?: (sortDirection: SortDirection) => void;
}

export const ColumnHeader = ({
  label,
  sortDirection,
  onClickSort,
  ...tableCellProps
}: ColumnHeaderProps) => {
  const isSortable = !isNil(onClickSort);
  const isSortActive = !isNil(sortDirection);
  return (
    <StyledTableCell
      stickyRow
      isSortActive={isSortActive}
      isSortable={isSortable}
      {...tableCellProps}
    >
      <Stack alignItems={tableCellProps.align === "right" ? "end" : "start"}>
        {renderLabel(label)}
        {isSortable && (
          <SortControls sortDirection={sortDirection} onClick={onClickSort} />
        )}
      </Stack>
    </StyledTableCell>
  );
};

function renderLabel(label: React.ReactNode): React.ReactNode {
  return typeof label === "string" ? (
    <Typography variant="labelSmall" color="inherit">
      {label}
    </Typography>
  ) : (
    label
  );
}

type AriaSortDirection = ColumnHeaderProps["aria-sort"];

/**
 * Returns the value for the aria-sort property
 */
export function getAriaSort(
  isSorted: boolean,
  sortDirection: SortDirection
): AriaSortDirection {
  return isSorted
    ? sortDirection === SortDirection.ASC
      ? "ascending"
      : "descending"
    : undefined;
}
