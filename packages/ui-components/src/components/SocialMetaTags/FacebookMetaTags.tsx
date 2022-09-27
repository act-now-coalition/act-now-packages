import React from "react";

export interface FacebookMetaTagsProps {
  fbAppId?: string;
}

export const FacebookMetaTags: React.FC<FacebookMetaTagsProps> = ({
  fbAppId,
}) => {
  return <>{fbAppId && <meta property="fb:app_id" content={fbAppId} />}</>;
};
