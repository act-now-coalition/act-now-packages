import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";

/**
 * Theme configuration variables
 * https://mui.com/customization/theming/#theme-configuration-variables
 */
const theme = createTheme({
  palette,
  typography,
});

export default theme;
