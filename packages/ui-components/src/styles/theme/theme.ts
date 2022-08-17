import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import components from "./components";
/**
 * Theme configuration variables
 * https://mui.com/customization/theming/#theme-configuration-variables
 */

const themeConfig = {
  palette,
  typography,
  components,
};

const theme = responsiveFontSizes(createTheme(themeConfig));

export { themeConfig };
export default theme;
