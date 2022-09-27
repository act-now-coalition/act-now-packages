import React from "react";

export interface TwitterMetaTagsProps {
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterImg?: string;
}

export const TwitterMetaTags: React.FC<TwitterMetaTagsProps> = ({
  twitterCard = "summary_large_image",
  twitterImg,
}) => {
  return (
    <>
      <meta name="twitter:card" content={twitterCard} />
      {twitterImg && <meta name="twitter:image" content={twitterImg} />}
    </>
  );
};
