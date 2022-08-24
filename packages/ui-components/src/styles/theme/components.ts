/** MUI theme components */
import { ThemeOptions, createTheme } from "@mui/material";
import typography, { typographyConstants } from "./typography";
import palette from "./palette";

const referenceTheme = createTheme();

const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontFamily: typography.labelLarge.fontFamily,
        fontSize: typography.labelLarge.fontSize,
        fontWeight: typography.labelLarge.fontWeight,
        lineHeight: typography.labelLarge.lineHeight,
      },
      outlinedPrimary: {
        borderColor: palette.border.default,
      },
    },
  },
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
