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

// Various react hooks used for UI components.
export * from "./common/hooks";

/** UI Components and props */
export * from "./components/Axis";
export * from "./components/BarChart";
export * from "./components/CompareTable";
export * from "./components/Grid";
export * from "./components/InfoTooltip";
export * from "./components/LabelIcon";
export * from "./components/LegendCategorical";
export * from "./components/LegendThreshold";
export * from "./components/LineChart";
export * from "./components/Maps";
export * from "./components/Markdown";
export * from "./components/MetricCatalogContext";
export * from "./components/MetricCompareTable";
export * from "./components/MetricDot";
export * from "./components/MetricLegendCategorical";
export * from "./components/MetricLegendThreshold";
export * from "./components/MetricOverview";
export * from "./components/MetricSparklines";
export * from "./components/MetricValue";
export * from "./components/MultiProgressBar";
export * from "./components/ProgressBar";
export * from "./components/RectClipGroup";
export * from "./components/RegionSearch";
export * from "./components/SparkLine";
