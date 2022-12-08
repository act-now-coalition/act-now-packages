import { Tab } from "@mui/material";

import { styled } from "../../styles";

export const MetricTab = styled(Tab)`
  align-items: "flex-start";

  width: 115px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 160px;
  }
`;
