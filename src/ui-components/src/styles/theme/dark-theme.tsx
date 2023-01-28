import {
  Theme,
  ThemeOptions,
  colors,
  createTheme,
  formControlClasses,
  linkClasses,
  responsiveFontSizes,
  svgIconClasses,
  tableCellClasses,
  tableRowClasses,
  typographyClasses,
} from "@mui/material";
import { deepmerge } from "@mui/utils";

import { themeConfig as defaultThemeConfig } from "./theme";

const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      containedPrimary: ({ theme }: { theme: Theme }) => ({
        "&: hover": {
          backgroundColor: theme.palette.grey[500],
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      label: ({ theme }: { theme: Theme }) => ({
        ...theme.typography.labelSmall,
        color: theme.palette.common.white,
      }),
      deleteIcon: ({ theme }: { theme: Theme }) => ({
        "&: hover": {
          color: theme.palette.common.white,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: ({ theme }: { theme: Theme }) => ({
        height: "2px",
        backgroundColor: theme.palette.common.white,
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      groupedHorizontal: ({ theme }: { theme: Theme }) => ({
        border: "none",
        color: theme.typography.paragraphSmall.color,
        textTransform: "none",
        borderBottom: `solid 2px transparent`,
        ":not(:first-of-type)": {
          borderLeft: "none",
        },
        "&.Mui-selected": {
          ...theme.typography.labelSmall,
          borderBottom: `solid 2px ${theme.palette.common.white}`,
          backgroundColor: "transparent",
        },
      }),
      groupedVertical: ({ theme }: { theme: Theme }) => ({
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
          borderRight: `solid 2px ${theme.palette.common.white}`,
          backgroundColor: "transparent",
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        [`&.${formControlClasses.root}`]: {
          backgroundColor: colors.blueGrey[700],
          color: theme.palette.text.primary,
        },
      }),
    },
  },
  MuiTable: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        [`& .${tableRowClasses.root}:nth-of-type(odd)`]: {
          color: theme.palette.text.primary,
          backgroundColor: colors.blueGrey[700],
        },
        [`& .${tableRowClasses.root}:nth-of-type(even)`]: {
          color: theme.palette.text.primary,
          backgroundColor: colors.blueGrey[800],
        },
        [`& .${tableRowClasses.root}:hover`]: {
          [`.${linkClasses.root} .${typographyClasses.root}`]: {
            color: theme.palette.primary.light,
          },
        },
        [`& .${tableCellClasses.root}.${tableCellClasses.head}`]: {
          verticalAlign: "bottom",
          color: theme.palette.text.primary,
          backgroundColor: colors.blueGrey[800],
        },
        [`& .${tableCellClasses.root}.${tableCellClasses.head} ${svgIconClasses.root}`]:
          {
            color: theme.palette.text.primary,
          },
      }),
    },
  },
};

// TODO(#452): Implement a proper dark theme. Michael copy/pasted this from Pablo's
// hackathon project and it probably has issues / is incomplete / etc. We may also
// want to refactor this across multiple files (palette, typography, etc.) like the
// default theme.
const darkThemeConfig = {
  palette: {
    mode: "dark",
    background: {
      default: colors.blueGrey[900],
    },
    border: {
      default: colors.grey[400],
    },
    primary: {
      main: colors.grey[200],
      contrastText: colors.grey[900],
    },
    text: {
      primary: colors.grey[100],
      secondary: colors.grey[100],
    },
    severity: {
      100: colors.blue[500],
      200: colors.blue[300],
      300: colors.blue[100],
      400: colors.purple[200],
      500: colors.purple[400],
    },
    chart: {
      main: colors.common.white,
      axis: colors.common.white,
      axisLabel: colors.common.white,
    },
  },
  typography: {
    h1: {
      color: "#fff",
    },
    h2: {
      color: "#fff",
    },
    h3: {
      color: "#fff",
    },
    h4: {
      color: "#fff",
    },
    h5: {
      color: "#fff",
    },
    h6: {
      color: "#fff",
    },
    dataEmphasizedSmall: {
      color: "#fff",
    },
    dataEmphasizedLarge: {
      color: "#fff",
    },
    dataTabular: {
      color: "#fff",
    },
    labelLarge: {
      color: "#fff",
    },
    labelSmall: {
      color: "#fff",
    },
    paragraphLarge: {
      color: "#fff",
    },
    paragraphSmall: {
      color: "#fff",
    },
    overline: {
      color: "#fff",
    },
  },
  components,
};

const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(defaultThemeConfig, darkThemeConfig))
);

export { darkThemeConfig };
export default darkTheme;
