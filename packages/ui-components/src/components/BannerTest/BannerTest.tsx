import React from "react";
import { Box } from "@mui/system";

export interface BannerTestProps {
  color: string; //"red", "blue"
}

export const BannerTest: React.FC<BannerTestProps> = ({ color }) => {
  return (
    <Box sx={{ backgroundColor: color, height: "100px", width: "100px" }} />
  );
};
