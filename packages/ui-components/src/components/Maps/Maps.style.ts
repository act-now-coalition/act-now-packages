import { styled } from "../../styles";

export const StyledCanvas = styled("canvas")`
  pointer-events: none;
`;

export const MapContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const PositionAbsolute = styled("div")`
  position: absolute;
`;

export const RegionOverlay = styled("path")`
  fill: ${(props) => props.theme.palette.common.white};
  fill-opacity: 0;
  cursor: pointer;
  &:hover {
    fill-opacity: 0.3;
    stroke: ${(props) => props.theme.palette.common.white};
  }
`;

export const BorderingRegion = styled("path")`
  fill: ${(props) => props.theme.palette.grey[300]};
  stroke: ${(props) => props.theme.palette.common.white};
  stroke-width: 1;
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.palette.grey[400]};
  }
`;

export const RegionShapeBase = styled("path")`
  stroke: ${(props) => props.theme.palette.common.white};
  stroke-width: 1;
`;

export const HighlightableShape = styled("path")<{
  highlight: boolean;
}>`
  stroke: ${(props) => (props.highlight ? "black" : "white")};
  stroke-width: ${(props) => (props.highlight ? "2.5" : "1")};
`;
