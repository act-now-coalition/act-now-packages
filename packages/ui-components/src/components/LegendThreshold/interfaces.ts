interface CommonLegendThresholdProps<T> {
  /** Height of the thermometer */
  height?: number;
  /** Width of the thermometer */
  width?: number;
  /** Border radius of the thermometer bar */
  borderRadius?: number;
  /** List of items representing the labels */
  items: T[];
  /** Function that returns the color of each item */
  getItemColor: (item: T, itemIndex: number) => string;
  /** Whether to show the labels or not */
  showLabels?: boolean;
  /** Function that returns the label of each item */
  getItemLabel?: (item: T, itemIndex: number) => string;
}

// TODO (chelsi) - can you have showLabels without getItemLabel?

interface LegendThresholdHorizontalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "horizontal";
}

interface LegendThresholdVerticalProps<T>
  extends CommonLegendThresholdProps<T> {
  /** Orientation of the bars */
  orientation: "vertical";
  /** Function that returns the item's secondary label */
  getItemSublabel?: (item: T, itemIndex: number) => string;
}

export type LegendThresholdProps<T> =
  | LegendThresholdHorizontalProps<T>
  | LegendThresholdVerticalProps<T>;
