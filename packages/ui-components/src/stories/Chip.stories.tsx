import React from "react";
import { Chip } from "@mui/material";

export default {
  title: "Design System/Chip",
};

export const DefaultExample = () => <Chip label="New York" />;

export const Deletable = () => (
  <Chip
    label="New York"
    variant="outlined"
    onDelete={() => console.log("Delete")}
  />
);

export const ClickableAndDeletable = () => (
  <Chip
    label="New York"
    variant="outlined"
    onDelete={() => console.log("Delete")}
    onClick={() => console.log("Click")}
  />
);
