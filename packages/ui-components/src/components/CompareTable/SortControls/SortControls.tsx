import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "./SortControls.style";
import { IconButton, Stack } from "@mui/material";
import { SortDirection } from "..";

export interface SortControlsProps {
  active: boolean;
  sortDirection: SortDirection;
  onClick: (direction: SortDirection) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  active,
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
          active={active && sortDirection === SortDirection.DESC}
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
          active={active && sortDirection === SortDirection.ASC}
        />
      </IconButton>
    </Stack>
  );
};
