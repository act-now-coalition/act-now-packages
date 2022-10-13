export interface BaseMultiProgressBarProps {
  maxValue: number;
  barColor?: string;
  bgColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface MultiProgressBarProps<T> extends BaseMultiProgressBarProps {
  firstItem: T;
  secondItem: T;
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
}
