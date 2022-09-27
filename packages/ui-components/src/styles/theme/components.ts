/** MUI theme components */
import { ThemeOptions, createTheme } from "@mui/material";

const referenceTheme = createTheme();

const components: ThemeOptions["components"] = {
  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }) => ({
        height: theme.spacing(0.375),
        backgroundColor: theme.palette.common.black,
      }),
      flexContainer: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.border.default}`,
        width: "fit-content",
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        padding: `0px 0px ${theme.spacing(2)} 0px`,
        margin: `0px ${theme.spacing(2)}`,
        ":first-of-type": {
          marginLeft: "0px",
        },
        ":last-of-type": {
          marginRight: "0px",
        },
        ":not(&.Mui-selected)": {
          span: {
            color: theme.palette.text.secondary,
          },
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        fontFamily: theme.typography.labelLarge.fontFamily,
        fontSize: theme.typography.labelLarge.fontSize,
        fontWeight: theme.typography.labelLarge.fontWeight,
        lineHeight: theme.typography.labelLarge.lineHeight,
      }),
      outlinedPrimary: ({ theme }) => ({
        borderColor: theme.palette.border.default,
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: "black",
        color: "white",
        fontSize: theme.typography.paragraphLarge.fontSize,
        lineHeight: theme.typography.paragraphLarge.lineHeight,
        padding: "16px",
        "& a": {
          color: "white",
        },
        [referenceTheme.breakpoints.down("sm")]: {
          padding: "20px 24px",
        },
      }),
      arrow: {
        color: "black",
      },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.paragraphSmall,
        border: `solid 1px ${theme.palette.border.default}`,
      }),
      groupedHorizontal: ({ theme }) => ({
        border: "none",
        color: theme.typography.paragraphSmall.color,
        textTransform: "none",
        borderBottom: `solid 2px transparent`,
        ":not(:first-of-type)": {
          borderLeft: "none",
        },
        "&.Mui-selected": {
          ...theme.typography.labelSmall,
          borderBottom: `solid 2px ${theme.palette.secondary.dark}`,
          backgroundColor: "transparent",
        },
      }),
      groupedVertical: ({ theme }) => ({
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "none",
        color: theme.typography.paragraphSmall.color,
        textTransform: "none",
        ":first-of-type": {
          borderTop: "none",
        },
        ":last-of-type": {
          borderBottom: "none",
        },
        "&.Mui-selected": {
          ...theme.typography.labelSmall,
          borderRight: `solid 2px ${theme.palette.secondary.dark}`,
          backgroundColor: "transparent",
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.border.default,
      }),
      label: ({ theme }) => ({
        ...theme.typography.labelSmall,
        color: theme.palette.secondary.dark,
      }),
      deleteIcon: ({ theme }) => ({
        color: theme.palette.text.disabled,
        ":hover": {
          color: theme.palette.secondary.dark,
        },
      }),
    },
  },
};

export default components;
