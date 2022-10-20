import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";

interface ButtonContent {
  /* Display text */
  label: string;
  /* Target URL */
  url: string;
  /* Optional onClick (for tracking, any additional onClick functionality) */
  onClick?: () => void;
}

export interface OverviewBannerProps {
  title?: string;
  body: React.ReactNode;
  primaryButton?: ButtonContent;
  secondaryButton?: ButtonContent;
}

export const OverviewBanner: React.FC<OverviewBannerProps> = ({
  title,
  body,
  primaryButton,
  secondaryButton,
}) => {
  const theme = useTheme();

  return (
    <Stack spacing={2} p={3} bgcolor={theme.palette.grey[100]} borderRadius={1}>
      {title && <Typography variant="labelLarge">{title}</Typography>}
      {body && (
        <Typography pb={1.5} variant="paragraphLarge">
          {body}
        </Typography>
      )}
      <Stack direction="row" spacing={2}>
        {primaryButton && (
          <Button
            variant="text"
            href={primaryButton.url}
            onClick={primaryButton.onClick}
          >
            {primaryButton.label}
          </Button>
        )}
        {secondaryButton && (
          <Button
            variant="text"
            href={secondaryButton.url}
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.label}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
