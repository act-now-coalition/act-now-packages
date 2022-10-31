interface BaseWorldMapProps {
  renderTooltip: (regionId: string) => React.ReactNode;
  getFillColor?: (regionId: string) => string;
  getFillOpacity?: (geoId: string) => number;
  width?: number;
}

export interface WorldMapProps extends BaseWorldMapProps {
  getRegionUrl?: (regionId: string) => string | undefined;
}
