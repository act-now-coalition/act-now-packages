/** MUI theme components */

import { createTheme } from "@mui/material/styles";

const referenceTheme = createTheme();

const components = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "black",
        color: "white",
        fontSize: ".8125rem",
        lineHeight: "1.4",
        padding: "16px",
        "& a": {
          color: "white",
        },
        [referenceTheme.breakpoints.down("sm")]: {
          padding: "20px 24px",
        },
      },
      arrow: {
        color: "black",
      },
    },
  },
};

export default components;
