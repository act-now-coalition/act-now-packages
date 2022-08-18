import React from "react";
import isObject from "lodash/isObject";
import { Typography, Palette, Grid, Box } from "@mui/material";
import theme from "../styles/theme";

export default {
  title: "Design System/Colors",
};

const paletteGroups = (Object.keys(theme.palette) as (keyof Palette)[])
  .filter((name) => isObject(theme.palette[name]))
  .filter((name) => ["mode"].includes(name))
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

const ColorGroup: React.FC<{
  colorGroupName: string;
  colorInfoList: ColorInfo[];
}> = ({ colorGroupName, colorInfoList }) => (
  <Box key={colorGroupName} mt={4} mb={2}>
    <Typography variant="overline">{colorGroupName}</Typography>
    {colorInfoList.map((item) => (
      <Grid key={item.name} container mt={2}>
        <Grid item sm={1} xs={12}>
          <ColorBox color={item.color} />
        </Grid>
        <Grid item sm={11} xs={12}>
          <Typography variant="labelSmall">{item.name}</Typography>
        </Grid>
      </Grid>
    ))}
  </Box>
);

const ColorBox: React.FC<{ color: string }> = ({ color }) => (
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
