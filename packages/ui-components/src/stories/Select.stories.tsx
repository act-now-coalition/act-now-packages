import React, { useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default {
  title: "Design System/Select",
};

const sampleOptions = [
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
];

const longOptions = sampleOptions.concat({
  value: "option 4",
  label:
    "Option 4. I am a very long option. I may extend pass the width of the component. Some might even mysteriously decide to make me a long paragraph...",
});

const defaultProps: TextFieldProps = {
  label: <Typography variant="paragraphSmall">Select</Typography>,
};

export const Select = () => {
  const [option, setOption] = useState("option 1");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  return (
    <Box component="form" width={320}>
      <TextField {...defaultProps} value={option} onChange={handleChange}>
        {sampleOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography noWrap>{option.label}</Typography>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export const SelectWithLongLabel = () => {
  const [option, setOption] = useState("option 1");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  return (
    <Box component="form" width={320}>
      <TextField
        {...defaultProps}
        label={
          <Typography fontSize={14} whiteSpace={"normal"}>
            This is a very long label. Please select one of the options below.
          </Typography>
        }
        value={option}
        onChange={handleChange}
        SelectProps={{
          disableUnderline: true,
          IconComponent: KeyboardArrowDownIcon,
          SelectDisplayProps: { style: { paddingTop: 44 } },
        }}
      >
        {sampleOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography noWrap>{option.label}</Typography>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export const SelectWithLongOption = () => {
  const [option, setOption] = useState("option 1");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  return (
    <Box component="form" width={500}>
      <TextField {...defaultProps} value={option} onChange={handleChange}>
        {longOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography noWrap>{option.label}</Typography>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
