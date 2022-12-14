import { styled } from "../../styles";

export const Dot = styled("div")`
  height: ${({ theme }) => theme.spacing(1)};
  width: ${({ theme }) => theme.spacing(1)};
  border-radius: 50%;
`;

/**
 * PlaceholderDot is used to keep spacing consistent as metric data is
 * loading, or when metrics without category colors are shown alongside metrics
 * with category colors.
 */
export const PlaceholderDot = styled(Dot)`
  background-color: transparent;
`;
