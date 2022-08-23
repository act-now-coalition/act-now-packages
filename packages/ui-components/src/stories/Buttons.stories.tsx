import React from "react";
import { Stack, Button, ButtonGroup, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";

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
  <IconButton aria-label="delete" color="primary">
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
