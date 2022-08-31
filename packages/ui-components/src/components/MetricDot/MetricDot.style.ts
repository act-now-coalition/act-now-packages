import { styled } from "../../styles";

export const Dot = styled("div")`
  height: ${({ theme }) => theme.spacing(1)};
  width: ${({ theme }) => theme.spacing(1)};
  border-radius: 50%;
`;

/**
 * The PlaceholderDot is used to keep spacing consistent as metric data is
 * loaded, or when metrics without levels are shown alongside metrics with
 * levels.
 */
export const PlaceholderDot = styled(Dot)`
  background-color: transparent;
`;
