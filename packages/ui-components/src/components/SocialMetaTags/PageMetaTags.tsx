import React, { Fragment } from "react";

export interface PageMetaTagsProps {
  siteName: string;
  url: string;
  title: string;
  description: string;
}

export const PageMetaTags: React.FC<PageMetaTagsProps> = ({
  siteName,
  url,
  title,
  description,
}) => {
  return (
    <Fragment>
      <title data-react-helmet="true">{title}</title>
      <link data-react-helmet="true" rel="canonical" href={url} />
      <meta data-react-helmet="true" name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Fragment>
  );
};
