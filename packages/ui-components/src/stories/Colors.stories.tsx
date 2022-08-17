import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import theme from "../styles/theme";

export default {
  title: "Design System/Colors",
};

const groups = Object.keys(theme.palette)
  .filter((name) => typeof theme.palette[name] === "object")
  .filter((name) => !["mode"].includes(name))
  .map((name) => {
    const colors = Object.keys(theme.palette[name]).map((colorKey) => ({
      name: `theme.palette.${name}.${colorKey}`,
      color: theme.palette[name][colorKey],
    }));
    return { name, colors };
  });

interface ColorInfo {
  name: string;
  color: string;
}

export const All = () => {
  return (
    <>
      {groups.map((group) => (
        <ColorGroup key={group.name} name={group.name} colors={group.colors} />
      ))}
    </>
  );
};

const ColorGroup: React.FC<{ name: string; colors: ColorInfo[] }> = ({
  name,
  colors,
}) => (
  <Box key={name} mt={4} mb={2}>
    <Typography variant="overline">{name}</Typography>
    {colors.map((item) => (
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
      borderRadius: 4,
      backgroundColor: color,
    }}
  />
);
