import { styled } from "../../styles";

/** CanvasMap */
export const StyledCanvas = styled("canvas")`
  pointer-events: none;
`;

/** USNationalMap */
export const MapContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const PositionAbsolute = styled("div")`
  position: absolute;
`;

/** StatesMap */
export const RegionOverlay = styled("path")`
  stroke: ${(props) => props.theme.palette.common.black};
  fill-opacity: 0;
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.palette.common.white};
    fill-opacity: 0.3;
  }
`;

export const StateShape = styled("path")``;

/** USStateMap */
export const StateGrey = styled("path")`
  fill: ${(props) => props.theme.palette.grey[300]};
  stroke: ${(props) => props.theme.palette.common.black};
  stroke-width: 2;
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.palette.grey[400]};
    stroke: ${(props) => props.theme.palette.common.white};
  }
`;

export const StateBorder = styled("path")`
  stroke: ${(props) => props.theme.palette.common.white};
  fill: none;
`;

export const CountyOrCongressionalDistrictShape = styled("path")<{
  highlight: boolean;
}>`
  stroke: ${(props) => (props.highlight ? "red" : "blue")};
  stroke-width: ${(props) => (props.highlight ? "2.5" : "1")};
`;
