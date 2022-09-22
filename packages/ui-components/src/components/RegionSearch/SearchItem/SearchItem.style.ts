import { styled } from "../../../styles";
import isValidProp from "@emotion/is-prop-valid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import { Dot } from "../../MetricDot/MetricDot.style";

export const CircleIcon = styled(Dot, {
  shouldForwardProp: isValidProp,
})<{
  iconColor: string;
}>`
  background-color: ${({ iconColor }) => iconColor};
  margin-top: ${({ theme }) => theme.spacing(0.8)};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.common.black};
`;

export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 1.5)};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
