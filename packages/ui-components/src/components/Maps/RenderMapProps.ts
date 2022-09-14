import { Region } from "@actnowcoalition/regions";

export interface RenderMapProps {
  renderTooltip: (regionId: string) => React.ReactElement | string;
  getFillColor?: (region: Region) => string;
  width?: number;
}
