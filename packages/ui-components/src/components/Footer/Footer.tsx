import React from "react";
import { Stack, Box, useTheme } from "@mui/material";

export interface FooterProps {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProps) => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.footer.background} paddingX={3} paddingY={8}>
      <Stack spacing={3} maxWidth="960px" margin="auto">
        {children}
      </Stack>
    </Box>
  );
};
