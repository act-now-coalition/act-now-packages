export interface RenderMapProps {
  renderTooltip: (regionId: string) => React.ReactElement | string;
  getFillColor?: (regionId: string) => string;
  width?: number;
}
