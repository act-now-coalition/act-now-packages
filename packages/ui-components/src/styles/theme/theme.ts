import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

/**
 * Theme configuration variables
 * https://mui.com/customization/theming/#theme-configuration-variables
 */

const themeConfig = {
  palette,
  typography,
};

const theme = createTheme(themeConfig);

export { themeConfig };
export default theme;
