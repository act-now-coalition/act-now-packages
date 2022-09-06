import React from "react";
import { Stack, Typography } from "@mui/material";
import { ColumnHeaderCell } from "./MetricCompareTable.style";

export interface ColumnHeaderProps
  extends React.ComponentProps<typeof ColumnHeaderCell> {
  columnTitle?: string;
  supportingText?: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  columnTitle,
  supportingText,
  ...otherHeaderProps
}) => {
  return (
    <ColumnHeaderCell stickyRow align="right" {...otherHeaderProps}>
      <Stack direction="column">
        {columnTitle && (
          <Typography variant="labelSmall">{columnTitle}</Typography>
        )}
        {supportingText && (
          <Typography variant="paragraphSmall">{supportingText}</Typography>
        )}
      </Stack>
    </ColumnHeaderCell>
  );
};
