export interface CommonLegendThresholdProps<T> {
  /** Height of the component, including the colored bars and labels. */
  height?: number;
  /** Border radius of the colored bars */
  borderRadius?: number;
  /** List of items representing the labels */
  items: T[];
  /** Function that returns the color of each level */
  getItemColor: (item: T, itemIndex: number) => string;
  /**
   * Whether to show the labels or not (true by default). Make sure to set
   * `barHeight` to `height` when not including the labels.
   */
  showLabels?: boolean;
  getItemLabel?: (item: T, itemIndex: number) => string;
}
