import palette from "./palette";
import { ExtendedTypographyOptions } from "./interfaces";

/**
 * Note: The default theme includes some fonts that need to be included at the
 * app level. Here are the link elements to include the fonts below. If a
 * specific project uses a different set of fonts, they will need to customize
 * the theme in consequence.
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
 * <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet">
 */
const typographyConstants = {
  fontFamily: "'Inter', sans-serif;",
  fontFamilyMono: "'Source Code Pro', monospace;",

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  fontSizeOSmall: ".75rem",
  fontSizePSmall: ".875rem",
  fontSizeBase: "1rem",
  fontSizeDSmall: "1.125rem",
  fontSizeDLarge: "1.5rem",
  fontSizeH1: "2.75rem",
  fontSizeH2: "2rem",
  fontSizeH3: "1.125rem",

  lineHeightSmall: 1,
  lineHeightMedium: 1.25,
  lineHeightBase: 1.5,
};

const typography: ExtendedTypographyOptions = {
  fontFamily: typographyConstants.fontFamily,

  h1: {
    fontSize: typographyConstants.fontSizeH1,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  h2: {
    fontSize: typographyConstants.fontSizeH2,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  h3: {
    fontSize: typographyConstants.fontSizeH3,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  /**
   * TODO (Pablo): The design system doesn't include styled for h4 - h6, so
   * I'm including it with the same style as h3 while we get the final styles.
   */
  h4: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  h5: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  h6: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  labelSmall: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizePSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightBase,
    color: palette.secondary.dark,
  },

  labelLarge: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightBase,
    color: palette.secondary.dark,
  },

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

  dataEmphasizedSmall: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizeDSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  dataEmphasizedLarge: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizeDLarge,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
  },

  dataTabular: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizePSmall,
    fontWeight: typographyConstants.fontWeightRegular,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.main,
  },

  overline: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeOSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.secondary.dark,
    textTransform: "uppercase",
  },
};

export { typographyConstants };
export default typography;
