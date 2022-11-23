import { Box, Grid, Palette, Stack, Typography } from "@mui/material";

import React from "react";
import isObject from "lodash/isObject";
import theme from "../styles/theme";

export default {
  title: "Design System/Colors",
};

// Filter out the palette attributes that don't correspond to colors,
// such as functions or numeric constants. The `mode` attribute is
// a string to name themes (dark, light, highContrast), but not a color,
// so we filter that out as well.
const paletteGroups = (Object.keys(theme.palette) as (keyof Palette)[])
  .filter((name) => isObject(theme.palette[name]))
  .filter((name) => name !== "mode")
  .map((name) => {
    const colorGroup = theme.palette[name] as Record<string, string>;
    const colorGroupKeys = Object.keys(colorGroup);
    const colors = colorGroupKeys.map((key) => {
      return {
        name: `theme.palette.${name}.${key}`,
        color: colorGroup[key],
      };
    });
    return { name, colors };
  });

interface ColorInfo {
  name: string;
  color: string;
}

export const All = () => (
  <>
    {paletteGroups.map((group) => (
      <ColorGroup
        key={group.name}
        colorGroupName={group.name}
        colorInfoList={group.colors}
      />
    ))}
  </>
);

const ColorGroup = ({
  colorGroupName,
  colorInfoList,
}: {
  colorGroupName: string;
  colorInfoList: ColorInfo[];
}) => (
  <Box key={colorGroupName} mt={4} mb={2}>
    <Typography variant="overline">{colorGroupName}</Typography>
    {colorInfoList.map((item) => (
      <Grid key={item.name} container mt={2}>
        <Grid item sm={1} xs={12}>
          <ColorBox color={item.color} />
        </Grid>
        <Grid item sm={11} xs={12}>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="labelSmall">{item.name}</Typography>
            <Typography variant="dataTabular">{item.color}</Typography>
          </Stack>
        </Grid>
      </Grid>
    ))}
  </Box>
);

const ColorBox = ({ color }: { color: string }) => (
  <div
    style={{
      width: 48,
      height: 48,
      border: `solid 1px ${theme.palette.border.default}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: color,
    }}
  />
);
