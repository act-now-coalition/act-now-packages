import React from "react";
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default {
  title: "Design System/SelectMultiple",
};

const cities = [
  { name: "Beijing", country: "China" },
  { name: "Tokyo", country: "Japan" },
  { name: "Kinshasa", country: "DR Congo" },
  { name: "Moscow", country: "Russia" },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Cairo", country: "Egypt" },
  { name: "Seoul", country: "South Korea" },
  { name: "Mexico City", country: "Mexico" },
  { name: "London", country: "United Kingdom" },
  { name: "Dhaka", country: "Bangladesh" },
];

const textFieldProps: TextFieldProps = {
  variant: "filled",
  fullWidth: true,
  label: <Typography variant="paragraphSmall">Locations</Typography>,
  InputLabelProps: { shrink: true },
};

export const ShortMultiSelect = () => {
  return (
    <Box width={320}>
      <Autocomplete
        multiple
        popupIcon={<KeyboardArrowDownIcon />}
        options={cities.map((option) => option.name)}
        defaultValue={[cities[0].name]}
        renderTags={(location, getTagProps) =>
          location.map((locationName, index) => (
            <Chip
              {...getTagProps({ index })}
              key={locationName}
              variant="outlined"
              label={locationName}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
          />
        )}
      />
    </Box>
  );
};

export const LongMultiSelect = () => {
  return (
    <Box width={600}>
      <Autocomplete
        multiple
        popupIcon={<KeyboardArrowDownIcon />}
        options={cities.map((option) =>
          option.name.concat(", ", option.country)
        )}
        defaultValue={[cities[0].name.concat(", ", cities[0].country)]}
        renderTags={(location, getTagProps) =>
          location.map((locationName, index) => (
            <Chip
              {...getTagProps({ index })}
              key={locationName}
              variant="outlined"
              label={locationName}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
          />
        )}
      />
    </Box>
  );
};
