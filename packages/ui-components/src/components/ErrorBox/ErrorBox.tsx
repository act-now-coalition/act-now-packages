import React from "react";

import { Box, useTheme } from "@mui/material";

export interface ErrorBoxProps {
  /** Height of error box. */
  width?: number;
  /** Width of error box. */
  height?: number;
  /** Text to display in error box. */
  children?: React.ReactNode;
}

export const ErrorBox = ({ width, height = 200, children }: ErrorBoxProps) => {
  const theme = useTheme();
  return (
    <Box
      width={width ?? "100%"}
      height={height}
      bgcolor={theme.palette.action.disabledBackground}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box color={theme.palette.common.black}>
        {children ?? "An error occurred."}
      </Box>
    </Box>
  );
};
