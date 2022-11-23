import theme, { themeConfig } from "./theme";

import { createStyled } from "@mui/system";

const styled = createStyled({ defaultTheme: theme });

export { styled, theme, themeConfig };
