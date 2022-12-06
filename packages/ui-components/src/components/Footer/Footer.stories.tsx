import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Footer } from ".";
import {
  Box,
  Typography,
  Stack,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default {
  title: "Components/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  const theme = useTheme();
  return (
    <Footer>
      <Box maxWidth={100}>
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bananas.svg/2560px-Bananas.svg.png"
            width="100%"
          />
        </a>
      </Box>
      <Typography variant="footer">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
        imperdiet lectus.
      </Typography>
      <Stack direction="row">
        <Typography variant="footer">
          <Link href="/" color="inherit">
            About
          </Link>
          &nbsp;·&nbsp;
          <Link href="/" color="inherit">
            Contact
          </Link>
          &nbsp;·&nbsp;
          <Link href="/" color="inherit">
            Terms
          </Link>
        </Typography>
      </Stack>
      <Stack direction="row">
        <IconButton edge="start" sx={{ color: theme.palette.footer.content }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.footer.content }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.footer.content }}>
          <InstagramIcon />
        </IconButton>
      </Stack>
    </Footer>
  );
};

export const Example = Template.bind({});
Example.args = {};
