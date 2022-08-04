import { createTheme, Theme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}

  interface Palette {
    severity: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
    gradient: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  }
}

/**
 * Theme configuration variables
 * https://mui.com/customization/theming/#theme-configuration-variables
 */
const theme = createTheme({
  palette,
  typography,
});

export default theme;
