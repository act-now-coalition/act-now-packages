import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface LabelIconProps extends TypographyProps {
  /** Icon to show at the end of the label (ArrowForward by default) */
  endIcon?: React.ReactNode;
}

const LabelIcon: React.FC<LabelIconProps> = ({
  endIcon = <ArrowForwardIcon fontSize="small" color="inherit" />,
  children,
  variant = "labelLarge",
  ...otherTypographyProps
}) => {
  return (
    <Typography variant={variant} {...otherTypographyProps}>
      <Stack direction="row" spacing={1} alignItems="center">
        <span>{children}</span>
        {endIcon}
      </Stack>
    </Typography>
  );
};

export default LabelIcon;
