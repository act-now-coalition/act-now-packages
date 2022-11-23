import { ArrowDownIcon, ArrowUpIcon } from "./SortControls.style";
import { IconButton, Stack } from "@mui/material";

import React from "react";
import { SortDirection } from "..";
import isNil from "lodash/isNil";

export interface SortControlsProps {
  /**
   * Current sort direction. When undefined, both buttons will be dimmed to
   * indicate that the table is not sorted by the current column.
   */
  sortDirection?: SortDirection;
  /**
   * Handler of the sorting buttons. It receives the sorting direction
   * corresponding to the option activated by the user.
   */
  onClick: (direction: SortDirection) => void;
}

export const SortControls = ({ sortDirection, onClick }: SortControlsProps) => {
  const isSortActive = !isNil(sortDirection);
  return (
    <Stack direction="row" spacing={0}>
      <IconButton
        size="small"
        edge="start"
        aria-label="Sort descending"
        onClick={() => onClick(SortDirection.DESC)}
      >
        <ArrowDownIcon
          fontSize="small"
          active={isSortActive && sortDirection === SortDirection.DESC}
        />
      </IconButton>
      <IconButton
        size="small"
        edge="end"
        aria-label="Sort ascending"
        onClick={() => onClick(SortDirection.ASC)}
      >
        <ArrowUpIcon
          fontSize="small"
          active={isSortActive && sortDirection === SortDirection.ASC}
        />
      </IconButton>
    </Stack>
  );
};
