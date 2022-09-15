import React, { Fragment } from "react";

export interface TwitterMetaTagsProps {
  twitterCard?: string;
  twitterImg?: string;
}

export const TwitterMetaTags: React.FC<TwitterMetaTagsProps> = ({
  twitterCard = "summary_large_image",
  twitterImg,
}) => {
  return (
    <Fragment>
      <meta name="twitter:card" content={twitterCard} />
      {twitterImg && <meta name="twitter:image" content={twitterImg} />}
    </Fragment>
  );
};
