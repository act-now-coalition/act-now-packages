import React from "react";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, ButtonGroup, IconButton, Stack } from "@mui/material";

export default {
  title: "Design System/Buttons",
};

export const Variants = () => (
  <Stack direction="row" spacing={2}>
    <Button variant="contained" endIcon={<ArrowForwardIcon />}>
      Contained
    </Button>
    <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
      Outlined
    </Button>
    <Button variant="text" endIcon={<ArrowForwardIcon />}>
      Text
    </Button>
  </Stack>
);

export const Icon = () => (
  <IconButton aria-label="share on Facebook" color="primary">
    <FacebookIcon />
  </IconButton>
);

export const Group = () => (
  <ButtonGroup>
    <Button endIcon={<LinkIcon />}>Copy Link</Button>
    <Button endIcon={<TwitterIcon />}>Twitter</Button>
    <Button endIcon={<FacebookIcon />}>Facebook</Button>
  </ButtonGroup>
);

export const InLargeContainer = () => (
  <Stack direction="row" height={200} border="1px solid blue" gap={1}>
    <Button variant="contained" endIcon={<LinkIcon />}>
      Copy Link
    </Button>
    <Button variant="outlined" endIcon={<TwitterIcon />}>
      Twitter
    </Button>
  </Stack>
);
