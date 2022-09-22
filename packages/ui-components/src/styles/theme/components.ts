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
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        ...typography.paragraphSmall,
        border: `solid 1px ${palette.border.default}`,
      },
      groupedHorizontal: {
        border: "none",
        color: typography.paragraphSmall.color,
        textTransform: "none",
        borderBottom: `solid 2px transparent`,
        ":not(:first-of-type)": {
          borderLeft: "none",
        },
        "&.Mui-selected": {
          ...typography.labelSmall,
          borderBottom: `solid 2px ${palette.secondary.dark}`,
          backgroundColor: "transparent",
        },
      },
      groupedVertical: {
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "none",
        color: typography.paragraphSmall.color,
        textTransform: "none",
        ":first-of-type": {
          borderTop: "none",
        },
        ":last-of-type": {
          borderBottom: "none",
        },
        "&.Mui-selected": {
          ...typography.labelSmall,
          borderRight: `solid 2px ${palette.secondary.dark}`,
          backgroundColor: "transparent",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        border: `solid 1px ${palette.border.default}`,
      },
      label: {
        fontFamily: typography.labelSmall.fontFamily,
        fontSize: typography.labelSmall.fontSize,
        fontWeight: typography.labelSmall.fontWeight,
        lineHeight: typography.labelSmall.lineHeight,
        color: palette.secondary.dark,
      },
      deleteIcon: {
        ":hover": {
          color: palette.secondary.dark,
        },
      },
    },
  },
};

export default components;
