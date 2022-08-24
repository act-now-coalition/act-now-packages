import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export interface LabelArrowProps {
  variant?: TypographyProps["variant"];
  children: React.ReactNode;
}

const LabelArrow: React.FC<LabelArrowProps> = ({
  variant = "labelLarge",
  children,
}) => (
  <Typography variant={variant}>
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <span>{children}</span>
      <ArrowForwardIcon fontSize="inherit" color="inherit" />
    </Stack>
  </Typography>
);

export default LabelArrow;
