import React, { useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default {
  title: "Design System/Select",
};

const options = [
  {
    value: "option 1",
    label: "Option 1",
  },
  {
    value: "option 2",
    label: "Option 2",
  },
  {
    value: "option 3",
    label: "Option 3",
  },
  {
    value: "option 4",
    label: "Option 4",
  },
];

export const Select = () => {
  const [option, setOption] = useState("option 1");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  return (
    <Box component="form" width={320}>
      <TextField
        select
        label={<Typography fontSize={14}>Select</Typography>}
        value={option}
        onChange={handleChange}
        variant="filled"
        fullWidth
        SelectProps={{
          disableUnderline: true,
          IconComponent: KeyboardArrowDownIcon,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
