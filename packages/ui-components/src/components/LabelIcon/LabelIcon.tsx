import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const LabelIcon: React.FC<TypographyProps & { endIcon?: React.ReactNode }> = ({
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
