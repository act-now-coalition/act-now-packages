import React, { Fragment } from "react";

export interface FacebookMetaTagsProps {
  fbAppId?: string;
  fbImg?: string;
  fbImgWidth?: string;
  fbImgHeight?: string;
  fbImgType?: string;
}

export const FacebookMetaTags: React.FC<FacebookMetaTagsProps> = ({
  fbAppId,
  fbImg,
  fbImgWidth,
  fbImgHeight,
  fbImgType = "image/png",
}) => {
  return (
    <Fragment>
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
      {fbImg && fbImgWidth && fbImgHeight && (
        <>
          <meta property="og:image:url" content={fbImg} />
          <meta property="og:image:width" content={fbImgWidth} />
          <meta property="og:image:height" content={fbImgHeight} />
          <meta property="og:image:type" content={fbImgType} />
        </>
      )}
    </Fragment>
  );
};
