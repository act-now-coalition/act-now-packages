import { createStyled } from "@mui/system";

import theme, { themeConfig } from "./theme";
import { darkTheme, darkThemeConfig } from "./theme";

const styled = createStyled({ defaultTheme: theme });

export { styled, theme, themeConfig, darkTheme, darkThemeConfig };
