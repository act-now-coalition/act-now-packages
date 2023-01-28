import React from "react";

import { Stack, Typography } from "@mui/material";

import { ArrowIcon, CircleIcon, Container } from "./SearchItem.style";

export interface SearchItemProps {
  /**
   * Label of the search item.
   */
  itemLabel: string;
  /**
   * Sublabel of the search item.
   */
  itemSublabel: string;
  /**
   * Color of the search item's circle icon.
   * If undefined, a circle icon does not render.
   */
  iconColor?: string;
}

export const SearchItem = ({
  itemLabel,
  itemSublabel,
  iconColor,
}: SearchItemProps) => {
  return (
    <Container>
      <Stack direction="row">
        {iconColor && <CircleIcon iconColor={iconColor} />}
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{itemLabel}</Typography>
          <Typography variant="paragraphSmall">{itemSublabel}</Typography>
        </Stack>
      </Stack>
      <ArrowIcon />
    </Container>
  );
};
