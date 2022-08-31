import { Theme } from "@mui/material/styles";

/** Theme variables */
export { themeConfig } from "./styles";

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
    labelSmall: true;
    labelLarge: true;
    dataEmphasizedSmall: true;
    dataEmphasizedLarge: true;
    dataTabular: true;
  }
}

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}

  interface TypographyVariants {
    paragraphSmall: React.CSSProperties;
    paragraphLarge: React.CSSProperties;
    labelSmall: React.CSSProperties;
    labelLarge: React.CSSProperties;
    dataEmphasizedSmall: React.CSSProperties;
    dataEmphasizedLarge: React.CSSProperties;
    dataTabular: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    paragraphSmall?: React.CSSProperties;
    paragraphLarge?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    dataEmphasizedSmall?: React.CSSProperties;
    dataEmphasizedLarge?: React.CSSProperties;
    dataTabular?: React.CSSProperties;
  }

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

/** UI Components and props */
export { default as BarChart } from "./components/BarChart";
export type { BarChartProps, BarChartOwnProps } from "./components/BarChart";
export { default as InfoTooltip } from "./components/InfoTooltip";
export { default as LegendThreshold } from "./components/LegendThreshold";
export type { LegendThresholdProps } from "./components/LegendThreshold";
export { default as LegendCategorical } from "./components/LegendCategorical";
export type { LegendCategoricalProps } from "./components/LegendCategorical";
export { default as LineChart } from "./components/LineChart";
export type { LineChartProps, LineChartOwnProps } from "./components/LineChart";
export { default as ProgressBar } from "./components/ProgressBar";
export type { ProgressBarProps } from "./components/ProgressBar";
export { default as RegionSearch } from "./components/RegionSearch";
export { AxisLeft, AxisBottom } from "./components/Axis";
export type { AxisLeftProps, AxisBottomProps } from "./components/Axis";
export * from "./components/MetricCatalogContext";
export { default as Markdown } from "./components/Markdown";
export { default as USNationalMap } from "./components/USNationalMap";

export { default as LabelIcon } from "./components/LabelIcon";
