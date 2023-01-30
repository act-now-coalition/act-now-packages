import { createStyled } from "@mui/system";

import theme, { darkTheme, darkThemeConfig, themeConfig } from "./theme";

const styled = createStyled({ defaultTheme: theme });

export { styled, theme, themeConfig, darkTheme, darkThemeConfig };
