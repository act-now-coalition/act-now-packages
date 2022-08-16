/** Theme interfaces */
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

/** Typography */
export interface ExtendedTypographyOptions extends TypographyOptions {
  /** Used for metric/location/human names (e.g. overview, search results) */
  labelSmall: React.CSSProperties;
  /**
   * Used for metric/location/human names (e.g. overview, search results),
   * but inside constrained areas (e.g. table header, tags)
   */
  labelLarge: React.CSSProperties;

  /** Used when text doesn’t need to stand out (e.g. footnotes) or inside
   * constrained areas (e.g. labels in charts) */
  paragraphSmall: React.CSSProperties;

  /** Used for general text purposes */
  paragraphLarge: React.CSSProperties;

  /** Used in tabs and overviews, but inside constrained areas */
  dataEmphasizedSmall: React.CSSProperties;

  /** Used in tabs and overviews */
  dataEmphasizedLarge: React.CSSProperties;

  /** Used in tables */
  dataTabular: React.CSSProperties;
}
