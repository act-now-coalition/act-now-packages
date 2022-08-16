import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Typography, Grid, Box } from "@mui/material";

export default {
  title: "Design System/Typography",
  component: Typography,
} as ComponentMeta<typeof Typography>;

const textSampleData = "123.4";
const textSampleShort = "Lorem ipsum dolor sit amet";
const textSampleParagraphLarge = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus est, fermentum sit amet ullamcorper at, venenatis eget lectus. Nunc ac augue eros. Ut gravida accumsan enim id maximus.

- Incentivize the installation of EV charging infrastructure beyond the city's current requirements.
- Publicize community-wide energy data. 
- Establish and track metrics related to energy equity. 
`;
const textSampleParagraphSmall = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus est, fermentum sit amet ullamcorper at, venenatis eget lectus. Nunc ac augue eros. Ut gravida accumsan enim id maximus.`;

// TODO(Pablo): How can I get this type from the theme?
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "paragraphLarge"
  | "paragraphSmall"
  | "labelLarge"
  | "labelSmall"
  | "dataEmphasizedLarge"
  | "dataEmphasizedSmall"
  | "dataTabular"
  | "overline";

const variantList: { variant: TypographyVariant; textSample: string }[] = [
  { variant: "h1", textSample: textSampleShort },
  { variant: "h2", textSample: textSampleShort },
  { variant: "h3", textSample: textSampleShort },
  { variant: "h4", textSample: textSampleShort },
  { variant: "h5", textSample: textSampleShort },
  { variant: "h6", textSample: textSampleShort },
  { variant: "labelLarge", textSample: textSampleShort },
  { variant: "labelSmall", textSample: textSampleShort },
  { variant: "paragraphLarge", textSample: textSampleParagraphLarge },
  { variant: "paragraphSmall", textSample: textSampleParagraphSmall },
  { variant: "dataEmphasizedLarge", textSample: textSampleData },
  { variant: "dataEmphasizedSmall", textSample: textSampleData },
  { variant: "dataTabular", textSample: textSampleData },
  { variant: "overline", textSample: textSampleShort },
];

export const All = () => (
  <Box>
    {variantList.map((item) => (
      <Grid key={`item-${item.variant}`} container mt={2}>
        <Grid item sm={4} xs={12} p={{ sm: 1, xs: 0.5 }}>
          <Typography variant="labelSmall">{item.variant}</Typography>
        </Grid>
        <Grid item sm={8} xs={12} p={{ sm: 1, xs: 0.5 }}>
          <Typography variant={item.variant}>{item.textSample}</Typography>
        </Grid>
      </Grid>
    ))}
  </Box>
);
