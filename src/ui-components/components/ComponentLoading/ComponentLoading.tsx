import React from "react";

import { Box } from "@mui/material";

/**
 * Empty component to be appended to another component to indicate that it is currently loading.
 *
 * Used for share image generation to ensure we wait until the component has loaded
 * before capturing the image.
 */
export const ComponentLoading = () => {
  return (
    <Box
      className="act-now-component-loading"
      style={{ display: "none" }}
    ></Box>
  );
};
