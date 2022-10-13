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
  firstItem: T;
  secondItem: T;
  getItemLabel: (item: T) => string;
  getItemValue: (item: T) => number;
}
