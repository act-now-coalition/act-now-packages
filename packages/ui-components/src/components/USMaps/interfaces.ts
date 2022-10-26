import { Region } from "@actnowcoalition/regions";

export interface BaseUSMapProps {
  renderTooltip: (regionId: string) => React.ReactNode;
  getFillColor?: (regionId: string) => string;
  getRegionUrl?: (regionId: string) => string | undefined;
  width?: number;
}

export interface USNationalMapProps extends BaseUSMapProps {
  showCounties?: boolean;
}

export interface USStateMapProps extends BaseUSMapProps {
  stateRegionId: string;
  currentRegion?: Region;
  showCounties?: boolean;
  showBorderingStates?: boolean;
  getRegionUrl?: (regionId: string) => string | undefined;
}
