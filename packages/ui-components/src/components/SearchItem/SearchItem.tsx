import { Stack, Typography } from "@mui/material";
import React from "react";

import { ArrowIcon, CircleIcon, Container } from "./SearchItem.style";

export interface SearchItemProps {
  /** Top label of the search item, in bold text. */
  itemLabel: string;
  /** Secondary label of the search item, in grey deemphasized text. */
  itemSublabel: string;
  /** Circle icon color. If omitted, no circle icon will render. */
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
