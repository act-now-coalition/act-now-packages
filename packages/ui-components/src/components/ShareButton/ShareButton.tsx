import React, { useState } from "react";
import { Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useMediaQuery, useTheme, ClickAwayListener } from "@mui/material";
import { SocialButtonBlock } from ".";

// TODO (Fai): Establish useBreakpoint as a separate util function.
function useBreakpoint(breakpointWidth: number): boolean {
  const theme = useTheme();
  const isBelowBreakpoint = useMediaQuery(
    theme.breakpoints.down(breakpointWidth)
  );
  return isBelowBreakpoint;
}

export interface ShareButtonProps {
  url: string | (() => Promise<string>);
  quote: string;
  onShareTwitter: () => void;
  onShareFacebook: () => void;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  quote,
  onShareTwitter,
  onShareFacebook,
}) => {
  // Turn url / imageUrl into asynchronous getters if they aren't already.
  const getUrl = typeof url === "string" ? () => Promise.resolve(url) : url;

  const [socialSharingProps, setSocialSharingProps] = useState<{
    url: string;
    quote: string;
    socialIconSize: number;
  } | null>(null);

  const isMobile = useBreakpoint(600);
  const socialIconSize = isMobile ? 40 : 50;

  // TODO (Fai): Implement useEscToClose in addition to ClickAwayListener.
  const hideSocialButtons = (delay = 0) => {
    const timeoutId = setTimeout(() => setSocialSharingProps(null), delay);
    return () => clearTimeout(timeoutId);
  };

  const showSocialButtons = () => {
    getUrl().then((url) => {
      setSocialSharingProps({
        url,
        quote,
        socialIconSize,
      });
    });
  };

  const toggleSocialButtons = () => {
    if (socialSharingProps) {
      hideSocialButtons();
    } else {
      showSocialButtons();
    }
  };

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <div>
        <Button
          variant="outlined"
          endIcon={<ShareIcon />}
          onClick={toggleSocialButtons}
          style={{ position: "relative" }}
        >
          Share
        </Button>
        {socialSharingProps && (
          <SocialButtonBlock
            {...socialSharingProps}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onCopyLink={() => {}}
            onShareOnTwitter={onShareTwitter}
            onShareOnFacebook={onShareFacebook}
            hideSocialButton={() => hideSocialButtons}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};
