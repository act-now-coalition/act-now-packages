export interface BaseMultiProgressBarProps {
  maxValue: number;
  /** Color of charted bars */
  barColor?: string;
  /** Background color of progress bar */
  bgColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface MultiProgressBarProps<T> extends BaseMultiProgressBarProps {
  items: [T, T];
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
}
