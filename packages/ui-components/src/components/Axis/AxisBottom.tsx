import React from "react";

import { ScaleTime } from "d3-scale";

import { AxisBottomBase, AxisBottomBaseProps } from "./AxisBottomBase";
import { getAxisFormattingInfo } from "./utils";

export type AxisBottomProps = AxisBottomBaseProps;

type TimeAxisBottomProps = Omit<AxisBottomBaseProps, "scale"> & {
  /**
   * d3-scale to convert between dates and pixel positions.
   */
  scale: ScaleTime<number, number>;
};

export const TimeAxisBottom = ({
  scale,
  ...otherProps
}: TimeAxisBottomProps) => {
  const [startDate, endDate] = scale.domain();
  const [x1, x2] = scale.range();
  const width = Math.abs(x2 - x1);

  const { numTicks, tickFormat } = getAxisFormattingInfo(
    startDate,
    endDate,
    width
  );

  return (
    <AxisBottomBase
      scale={scale}
      numTicks={numTicks}
      tickFormat={tickFormat}
      {...otherProps}
    />
  );
};

export const AxisBottom = ({
  scale,
  ...otherProps
}: AxisBottomProps | TimeAxisBottomProps) => {
  if (isTimeScale(scale)) {
    return <TimeAxisBottom scale={scale} {...otherProps} />;
  }

  return <AxisBottomBase scale={scale} {...otherProps} />;
};

function isTimeScale(scale: any): scale is ScaleTime<number, number> {
  const [start, end] = scale.domain();
  return start instanceof Date && end instanceof Date;
}
