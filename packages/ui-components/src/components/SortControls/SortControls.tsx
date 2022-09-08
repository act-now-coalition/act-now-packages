import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "./SortControls.style";
import { IconButton, Stack } from "@mui/material";

export enum SortDirection {
  ASC = "ascending",
  DESC = "descending",
}

export interface SortControlsProps {
  active: boolean;
  direction: SortDirection;
  onClick: (direction: SortDirection) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  direction,
  active,
  onClick,
}) => {
  return (
    <Stack direction="row" spacing={0}>
      <IconButton
        size="small"
        edge="start"
        aria-label="sort descending"
        onClick={() => onClick(SortDirection.DESC)}
      >
        <ArrowDownIcon
          fontSize="small"
          active={active && direction === SortDirection.DESC}
        />
      </IconButton>
      <IconButton
        size="small"
        edge="end"
        aria-label="sort ascending"
        onClick={() => onClick(SortDirection.ASC)}
      >
        <ArrowUpIcon
          fontSize="small"
          active={active && direction === SortDirection.ASC}
        />
      </IconButton>
    </Stack>
  );
};
