import { styled } from "../../styles";

export const Dot = styled("div")`
  height: ${({ theme }) => theme.spacing(1)};
  width: ${({ theme }) => theme.spacing(1)};
  border-radius: 50%;
`;

/**
 * The PlaceholderDot is used to keep spacing consistent as metric data is
 * loaded, or when metrics without category colors are shown alongside metrics
 * with category colors.
 */
export const PlaceholderDot = styled(Dot)`
  background-color: transparent;
`;
