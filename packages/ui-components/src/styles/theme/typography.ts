import { ExtendedTypographyOptions } from "./interfaces";
import palette from "./palette";

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
    color: palette.text.primary,
  },

  h2: {
    fontSize: typographyConstants.fontSizeH2,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  h3: {
    fontSize: typographyConstants.fontSizeH3,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  /**
   * TODO (Pablo): The design system doesn't include styled for h4 - h6, so
   * I'm including it with the same style as h3 while we get the final styles.
   */
  h4: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  h5: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  h6: {
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  labelSmall: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizePSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightBase,
    color: palette.text.primary,
  },

  labelLarge: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeBase,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightBase,
    color: palette.text.primary,
  },

  paragraphSmall: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizePSmall,
    lineHeight: typographyConstants.lineHeightSmall,
    color: palette.text.secondary,
  },

  paragraphLarge: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeBase,
    lineHeight: typographyConstants.lineHeightBase,
    color: palette.text.primary,
  },

  dataEmphasizedSmall: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizeDSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  dataEmphasizedLarge: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizeDLarge,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  dataTabular: {
    fontFamily: typographyConstants.fontFamilyMono,
    fontSize: typographyConstants.fontSizePSmall,
    fontWeight: typographyConstants.fontWeightRegular,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
  },

  overline: {
    fontFamily: typographyConstants.fontFamily,
    fontSize: typographyConstants.fontSizeOSmall,
    fontWeight: typographyConstants.fontWeightBold,
    lineHeight: typographyConstants.lineHeightMedium,
    color: palette.text.primary,
    textTransform: "uppercase",
  },
};

export { typographyConstants };
export default typography;
