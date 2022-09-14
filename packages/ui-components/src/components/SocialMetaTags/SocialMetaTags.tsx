import React, { Fragment } from "react";

export interface SocialMetaTagsProps {
  siteName: string;
  url: string;
  title: string;
  description: string;
}

export interface FacebookMetaTagsProps {
  fbAppId?: string;
  fbImg?: string;
  fbImgWidth?: string;
  fbImgHeight?: string;
  fbImgType?: string;
}

export interface TwitterMetaTagsProps {
  twitterCard?: string;
  twitterImg?: string;
}

export const SocialMetaTags: React.FC<
  SocialMetaTagsProps & FacebookMetaTagsProps & TwitterMetaTagsProps
> = ({
  siteName,
  url,
  title,
  description,
  fbAppId,
  fbImg,
  fbImgWidth = "1200",
  fbImgHeight = "630",
  fbImgType = "image/png",
  twitterCard = "summary_large_image",
  twitterImg,
}) => {
  return (
    <Fragment>
      {/* Facebook general open graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
      {/* Facebook page-specific open graph meta tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fbImg && (
        <>
          <meta property="og:image:url" content={fbImg} />
          <meta property="og:image:width" content={fbImgWidth} />
          <meta property="og:image:height" content={fbImgHeight} />
          <meta property="og:image:type" content={fbImgType} />
        </>
      )}
      {/* Twitter general meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      {/* Twitter page-specific meta tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterImg && <meta name="twitter:image" content={twitterImg} />}
    </Fragment>
  );
};
