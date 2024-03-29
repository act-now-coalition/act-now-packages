/** MUI theme components */
import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeOptions, createTheme } from "@mui/material";

const referenceTheme = createTheme();

const components: ThemeOptions["components"] = {
  MuiAutocomplete: {
    defaultProps: {
      filterSelectedOptions: true,
      disableClearable: true,
      popupIcon: <ExpandMoreIcon />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiInputLabel-root": {
          marginBottom: theme.spacing(1),
        },
        "& .MuiInputBase-root": {
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(1),
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
        height: "fit-content",
        minWidth: "fit-content",
        width: "fit-content",
        boxShadow: "none",
        "&: hover": {
          boxShadow: "none",
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        borderColor: theme.palette.border.default,
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

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        padding: `0 0 ${theme.spacing(2)} 0`,
        margin: `0 ${theme.spacing(2)}`,
        ":first-of-type": {
          marginLeft: "0",
        },
        ":last-of-type": {
          marginRight: "0",
        },
        justifyContent: "flex-end",
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }) => ({
        height: "2px",
        backgroundColor: theme.palette.common.black,
      }),
      flexContainer: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.border.default}`,
      }),
    },
  },

  MuiTextField: {
    defaultProps: {
      SelectProps: {
        disableUnderline: true,
        IconComponent: ExpandMoreIcon,
      },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.common.white,
        "& .MuiFilledInput-root": {
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.border.default}`,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.secondary.dark,
          "& p": {
            fontWeight: theme.typography.fontWeightBold,
          },
          "&:hover": {
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${theme.palette.primary.main}`,
          },
          "&.Mui-focused": {
            backgroundColor: theme.palette.common.white,
          },
        },
      }),
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

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        minWidth: 200,
        backgroundColor: "black",
        color: "white",
        fontSize: theme.typography.paragraphLarge.fontSize,
        lineHeight: theme.typography.paragraphLarge.lineHeight,
        padding: theme.spacing(2),
        "& a": {
          color: "white",
        },
        [referenceTheme.breakpoints.down("sm")]: {
          padding: theme.spacing(2.5, 3),
        },
      }),
      arrow: {
        color: "black",
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.action.disabledBackground,
      }),
    },
  },
};

export default components;
