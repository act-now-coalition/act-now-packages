import { Tab } from "@mui/material";

import { styled } from "../../styles";

export const MetricTab = styled(Tab)`
  align-items: flex-start;

  width: 115px;
  margin: 0;
  padding: ${({ theme }) => `0 ${theme.spacing(1)} ${theme.spacing(2)}`};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 160px;
  }
`;
