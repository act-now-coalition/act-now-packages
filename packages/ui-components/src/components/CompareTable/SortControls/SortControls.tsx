import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "./SortControls.style";
import { IconButton, Stack } from "@mui/material";
import { SortDirection } from "..";

export interface SortControlsProps {
  /**
   * Current sort direction. This prop is only used when
   * `isSortActive` is `true`.
   */
  sortDirection: SortDirection;
  /**
   * Indicates if the the current sort direction should be
   *  highlighted.
   */
  isSortActive: boolean;
  /**
   * Handler of the sorting buttons. It receives the sorting direction
   * corresponding to the option activated by the user.
   */
  onClick: (direction: SortDirection) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  isSortActive,
  sortDirection,
  onClick,
}) => {
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
