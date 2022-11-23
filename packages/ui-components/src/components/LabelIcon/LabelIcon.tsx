import { Stack, Typography, TypographyProps } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

export interface LabelIconProps extends TypographyProps {
  /** Icon to show at the end of the label (ArrowForward by default) */
  endIcon?: React.ReactNode;
}

export const LabelIcon = ({
  endIcon = <ArrowForwardIcon fontSize="small" color="inherit" />,
  children,
  variant = "labelLarge",
  ...otherTypographyProps
}: LabelIconProps) => {
  return (
    <Typography variant={variant} {...otherTypographyProps}>
      <Stack direction="row" spacing={1} alignItems="center">
        <span>{children}</span>
        {endIcon}
      </Stack>
    </Typography>
  );
};
