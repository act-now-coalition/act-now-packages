import React, { Fragment } from "react";

export interface FacebookMetaTagsProps {
  fbAppId?: string;
}

export const FacebookMetaTags: React.FC<FacebookMetaTagsProps> = ({
  fbAppId,
}) => {
  return (
    <Fragment>
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
    </Fragment>
  );
};
