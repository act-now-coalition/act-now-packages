/** MUI theme components */
import { ThemeOptions, createTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const referenceTheme = createTheme();

const components: ThemeOptions["components"] = {
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
        ":not(&.Mui-selected)": {
          span: {
            color: theme.palette.text.secondary,
          },
        },
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
        width: "fit-content",
      }),
    },
  },

  MuiTextField: {
    defaultProps: {
      SelectProps: {
        disableUnderline: true,
        IconComponent: KeyboardArrowDownIcon,
      },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(1, 2),
        "& .MuiFilledInput-root": {
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.border.default}`,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.secondary.dark,
          "& p": {
            fontWeight: theme.typography.fontWeightBold,
          },
          "& .MuiSelect-icon": {
            color: theme.palette.secondary.dark,
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
        backgroundColor: "black",
        color: "white",
        fontSize: theme.typography.paragraphLarge.fontSize,
        lineHeight: theme.typography.paragraphLarge.lineHeight,
        padding: theme.spacing(2),
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
};

export default components;
