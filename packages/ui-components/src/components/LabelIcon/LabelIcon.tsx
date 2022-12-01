import React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack, Typography, TypographyProps } from "@mui/material";

export type LabelIconProps = Pick<
  TypographyProps,
  "color" | "variant" | "children"
> & {
  endIcon?: React.ReactNode;
};

export const LabelIcon = ({
  endIcon = <ArrowForwardIcon fontSize="small" color="inherit" />,
  variant = "labelLarge",
  color,
  children,
}: LabelIconProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant={variant} color={color}>
        {children}
      </Typography>
      {endIcon}
    </Stack>
  );
};
