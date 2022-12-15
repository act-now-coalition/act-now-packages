import isValidProp from "@emotion/is-prop-valid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";

import { styled } from "../../styles";
import { Dot } from "../MetricDot/MetricDot.style";

export const CircleIcon = styled(Dot, {
  shouldForwardProp: isValidProp,
})<{
  iconColor: string;
}>`
  background-color: ${({ iconColor }) => iconColor};
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.common.black};
`;

export const Container = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(0.5, 0)};
`;
