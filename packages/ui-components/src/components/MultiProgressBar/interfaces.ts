export interface BaseMultiProgressBarProps {
  maxValue: number;
  width?: number;
  height?: number;
  bgColor?: string;
  borderRadius?: number;
}

export interface MultiProgressBarProps<T> extends BaseMultiProgressBarProps {
  items: T[];
  getItemColor: (item: T) => string;
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
}
