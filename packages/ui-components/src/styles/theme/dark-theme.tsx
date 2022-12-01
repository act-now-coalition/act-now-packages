import {
  Theme,
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
    paragraphSmall: {
      color: "#fff",
    },
  },
  components: {
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
  },
};

const darkTheme = responsiveFontSizes(
  createTheme(deepmerge(defaultThemeConfig, darkThemeConfig))
);

export { darkThemeConfig };
export default darkTheme;
