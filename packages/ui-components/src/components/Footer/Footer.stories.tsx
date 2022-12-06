import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Footer } from ".";
import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default {
  title: "Components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => (
  <Footer>
    <Box maxWidth={100}>
      <a href="https://www.google.ca" target="_blank" rel="noreferrer">
        <img
          src={
            "https://previews.123rf.com/images/artishokcs/artishokcs1407/artishokcs140700106/30397001-white-tree-icon-on-black-background.jpg"
          }
          alt="Logo image"
          width="100%"
        />
      </a>
    </Box>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
      imperdiet lectus.
    </Typography>
    <Stack direction="row">
      <Link href="https://www.covidactnow.org">About</Link>
      <Typography>&nbsp;·&nbsp;</Typography>
      <Link href="https://www.covidactnow.org">About</Link>
      <Typography>&nbsp;·&nbsp;</Typography>
      <Link href="https://www.covidactnow.org">About</Link>
      <Typography>&nbsp;·&nbsp;</Typography>
    </Stack>
    <Stack direction="row">
      <IconButton
        href="https://www.facebook.com"
        target="_blank"
        aria-label="Facebook"
        disableRipple
        edge="start"
        size="large"
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        href="https://www.twitter.com"
        target="_blank"
        aria-label="Twitter"
        disableRipple
        edge="start"
        size="large"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        href="https://www.instagram.com"
        target="_blank"
        aria-label="Instagram"
        disableRipple
        edge="start"
        size="large"
      >
        <InstagramIcon />
      </IconButton>
    </Stack>
  </Footer>
);

export const Example = Template.bind({});
Example.args = {};
