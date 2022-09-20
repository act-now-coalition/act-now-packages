import React, { Fragment, useState } from "react";
import { SocialButton, SocialShareButton } from "./ShareButton.style";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const CopyLinkButton = ({
  url,
  onCopyLink,
}: {
  url: string;
  onCopyLink: () => void;
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        setCopiedLink(true);
        onCopyLink();
      }}
    >
      <SocialShareButton>
        <SocialButton>
          {copiedLink ? (
            "Copied!"
          ) : (
            <Fragment>
              Copy
              <br />
              Link
            </Fragment>
          )}
        </SocialButton>
      </SocialShareButton>
    </CopyToClipboard>
  );
};
