import { createStyled } from "@mui/system";

import theme, { themeConfig } from "./theme";

const styled = createStyled({ defaultTheme: theme });

export { styled, theme, themeConfig };
