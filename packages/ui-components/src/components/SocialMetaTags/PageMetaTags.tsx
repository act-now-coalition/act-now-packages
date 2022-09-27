import React from "react";

export interface PageMetaTagsProps {
  siteName: string;
  url: string;
  title: string;
  description: string;
  img?: string;
  imgWidth?: string;
  imgHeight?: string;
  imgType?: string;
}

export const PageMetaTags: React.FC<PageMetaTagsProps> = ({
  siteName,
  url,
  title,
  description,
  img,
  imgWidth,
  imgHeight,
  imgType = "image/png",
}) => {
  return (
    <>
      <title key="title">{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {img && imgWidth && imgHeight && (
        <>
          <meta property="og:image:url" content={img} />
          <meta property="og:image:width" content={imgWidth} />
          <meta property="og:image:height" content={imgHeight} />
          <meta property="og:image:type" content={imgType} />
        </>
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};
