import React, { useState } from "react";

import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
} from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default {
  title: "Design System/ToggleButtons",
};

export const StatesOrCounties = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("states");

  const onChange = (e: React.MouseEvent, newSelectedOptionId: string) => {
    // Ensure that one option remains selected
    if (newSelectedOptionId !== null) {
      setSelectedOptionId(newSelectedOptionId);
    }
  };

  return (
    <ToggleButtonGroup value={selectedOptionId} exclusive onChange={onChange}>
      <ToggleButton value="states">States</ToggleButton>
      <ToggleButton value="counties">Counties</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const StatesOrCountiesVertical = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("states");

  const onChange = (e: React.MouseEvent, newSelectedOptionId: string) => {
    // Ensure that one option remains selected
    if (newSelectedOptionId !== null) {
      setSelectedOptionId(newSelectedOptionId);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedOptionId}
      exclusive
      onChange={onChange}
      orientation="vertical"
    >
      <ToggleButton value="states">States</ToggleButton>
      <ToggleButton value="counties">Counties</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const IconsHorizontal = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("justify");

  const onChange = (e: React.MouseEvent, newSelectedOptionId: string) => {
    // Ensure that one option remains selected
    if (newSelectedOptionId !== null) {
      setSelectedOptionId(newSelectedOptionId);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedOptionId}
      exclusive
      onChange={onChange}
      size="small"
    >
      <ToggleButton value="justify" aria-label="Justify">
        <FormatAlignJustify />
      </ToggleButton>
      <ToggleButton value="align-left" aria-label="Align left">
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="align-center" aria-label="Align center">
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="align-right" aria-label="Align right">
        <FormatAlignRight />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const IconsVertical = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("justify");

  const onChange = (e: React.MouseEvent, newSelectedOptionId: string) => {
    // Ensure that one option remains selected
    if (newSelectedOptionId !== null) {
      setSelectedOptionId(newSelectedOptionId);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedOptionId}
      exclusive
      onChange={onChange}
      size="small"
      orientation="vertical"
    >
      <ToggleButton value="justify" aria-label="Justify">
        <FormatAlignJustify />
      </ToggleButton>
      <ToggleButton value="align-left" aria-label="Align left">
        <FormatAlignLeft />
      </ToggleButton>
      <ToggleButton value="align-center" aria-label="Align center">
        <FormatAlignCenter />
      </ToggleButton>
      <ToggleButton value="align-right" aria-label="Align right">
        <FormatAlignRight />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
