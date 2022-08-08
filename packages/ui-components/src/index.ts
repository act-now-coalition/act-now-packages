import { Theme } from "@mui/material/styles";

/** Theme variables */
export * from "./styles"; // styled, theme

/** UI Components and props */
export { default as LegendThreshold } from "./components/LegendThreshold";
export type { LegendThresholdProps } from "./components/LegendThreshold";
export { default as LegendCategorical } from "./components/LegendCategorical";
export type { LegendCategoricalProps } from "./components/LegendCategorical";
export { default as ProgressBar } from "./components/ProgressBar";
export type { ProgressBarProps } from "./components/ProgressBar";
export { default as RegionSearch } from "./components/RegionSearch";

/**
 * Material UI Theme extensions
 *
 * In order to use our extensions to the material UI theme in TypeScript code,
 * we must patch some material-ui interfaces since the allowed values for various
 * properties (e.g. the `variant` property on typography) are based on the
 * members of these interfaces.
 *
 * In order to make sure consumers of our package can use our theme extensions, we do
 * this in the index.ts file.
 */

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    paragraphSmall: true;
    paragraphLarge: true;
  }
}

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}

  interface Palette {
    severity: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
    gradient: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  }
}
