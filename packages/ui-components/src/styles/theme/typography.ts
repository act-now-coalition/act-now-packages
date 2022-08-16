import palette from "./palette";
import { ExtendedTypographyOptions } from "./interfaces";

const typographyConstants = {
  fontFamily: "Arial",

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  fontSizePSmall: ".875rem",
  fontSizeBase: "1rem",

  lineHeightSmall: 1,
  lineHeightBase: 1.5,
};

const typography: ExtendedTypographyOptions = {
  fontFamily: typographyConstants.fontFamily,

  paragraphSmall: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizePSmall,
    lineHeight: typographyConstants.lineHeightSmall,
    color: palette.secondary.light,
  },
  paragraphLarge: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeBase,
    lineHeight: typographyConstants.lineHeightBase,
  },
};

export { typographyConstants };
export default typography;
