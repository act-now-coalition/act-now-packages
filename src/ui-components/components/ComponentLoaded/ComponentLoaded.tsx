import React from "react";

import { Box } from "@mui/material";

/**
 * Empty component to be appended to another component to indicate that it has fully loaded.
 *
 * Used for share image generation to ensure we wait until the component has loaded
 * before capturing the image.
 */
export const ComponentLoaded = () => {
  return (
    <Box className="act-now-component-loaded" style={{ display: "none" }}></Box>
  );
};
