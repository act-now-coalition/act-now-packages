/** Theme interfaces */
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

/** Typography */
export interface ExtendedTypographyOptions extends TypographyOptions {
  labelSmall: React.CSSProperties;
  labelLarge: React.CSSProperties;
  paragraphSmall: React.CSSProperties;
  paragraphLarge: React.CSSProperties;
  dataEmphasizedSmall: React.CSSProperties;
  dataEmphasizedLarge: React.CSSProperties;
  dataTabular: React.CSSProperties;
}
