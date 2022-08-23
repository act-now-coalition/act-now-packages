/** MUI theme components */

import { createTheme } from "@mui/material/styles";
import { typographyConstants } from "./typography";

const referenceTheme = createTheme();

const components = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "black",
        color: "white",
        fontSize: typographyConstants.fontSizeBase,
        lineHeight: typographyConstants.lineHeightBase,
        padding: "16px",
        "& a": {
          color: "white",
        },
        [referenceTheme.breakpoints.down("sm")]: {
          padding: "20px 24px",
        },
      },
      arrow: {
        color: "black",
      },
    },
  },
};

export default components;
