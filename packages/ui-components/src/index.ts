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

import { Theme } from "@mui/material/styles";

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
    border: {
      default: string;
    };
    gradient: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
    severity: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  }
}

/** Theme variables */
export { themeConfig } from "./styles";

/** UI Components and props */
export { default as InfoTooltip } from "./components/InfoTooltip";
export { default as LegendThreshold } from "./components/LegendThreshold";
export type { LegendThresholdProps } from "./components/LegendThreshold";
export { default as LegendCategorical } from "./components/LegendCategorical";
export type { LegendCategoricalProps } from "./components/LegendCategorical";
export { default as LineChart } from "./components/LineChart";
export type { LineChartProps } from "./components/LineChart";
export { default as ProgressBar } from "./components/ProgressBar";
export type { ProgressBarProps } from "./components/ProgressBar";
export { default as RegionSearch } from "./components/RegionSearch";
// Note (8/10/22) - Markdown is causing a bug. Commenting it out until fixed.
// export { default as Markdown } from "./components/Markdown";
