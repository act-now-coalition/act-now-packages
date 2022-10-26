import { Region } from "@actnowcoalition/regions";

export interface BaseUSMapProps {
  renderTooltip: (regionId: string) => string | React.ReactElement;
  getFillColor?: (regionId: string) => string;
  getRegionUrl?: (regionId: string) => string | undefined;
  width?: number;
}

export interface USNationalMapProps extends BaseUSMapProps {
  showCounties?: boolean;
}

export interface USStateMapProps extends BaseUSMapProps {
  /** Region ID of the state being mapped */
  stateRegionId: string;
  /** Optional region to highlight on the map */
  highlightedRegion?: Region;
  showCounties?: boolean;
  showBorderingStates?: boolean;
  getRegionUrl?: (regionId: string) => string | undefined;
}
