import React from "react";

import {
  DateFormat,
  TimeUnit,
  formatUTCDateTime,
  getTimeDiff,
} from "@actnowcoalition/time-utils";

import { AxisBottom, AxisBottomProps } from "./AxisBottom";

export const TimeAxisBottom = ({
  scale,
  width,
  ...otherProps
}: AxisBottomProps & {
  width: number;
}) => {
  const [startDate, endDate] = scale.domain();

  const { numTicks, tickFormat } = getAxisFormattingInfo(
    startDate,
    endDate,
    width
  );

  return (
    <AxisBottom
      scale={scale}
      numTicks={numTicks}
      tickFormat={tickFormat}
      {...otherProps}
    />
  );
};

interface AxisFormatInfo {
  numTicks: number;
  tickFormat: (date: Date) => string;
}

function getAxisFormattingInfo(
  startDate: Date,
  endDate: Date,
  width: number
): AxisFormatInfo {
  // We calculate what's the maximum number of tick labels that could fit
  // given the axis width and the width of the labels (about 40px).
  const maxTickLabelWidth = 70;
  const maxNumTicks = Math.floor(width / maxTickLabelWidth);

  const numDays = getTimeDiff(endDate, startDate, TimeUnit.DAYS);
  const numWeeks = getTimeDiff(endDate, startDate, TimeUnit.WEEKS);
  const numMonths = getTimeDiff(endDate, startDate, TimeUnit.MONTHS);

  // We shouldn't have more ticks than years when using this format,
  // otherwise more than one tick could have the same label.
  if (getTimeDiff(endDate, startDate, TimeUnit.YEARS) >= 3) {
    const numYears = getTimeDiff(endDate, startDate, TimeUnit.YEARS);
    return {
      numTicks: Math.min(maxNumTicks, numYears),
      tickFormat: (date: Date) => formatUTCDateTime(date, DateFormat.YYYY),
    };
  }

  if (getTimeDiff(endDate, startDate, TimeUnit.MONTHS) >= 6) {
    return { numTicks: maxNumTicks, tickFormat: formatMonth };
  }

  // Depending on the width of the axis, we either show ticks weekly
  // or monthly, depending on what's more likely to fit.
  if (getTimeDiff(endDate, startDate, TimeUnit.MONTHS) >= 1) {
    return {
      numTicks: width / numWeeks < maxTickLabelWidth ? numMonths : numWeeks,
      tickFormat: formatDay,
    };
  }

  // Show either weekly ticks or daily, depending on the how many ticks
  // we can fit.
  if (getTimeDiff(endDate, startDate, TimeUnit.WEEKS) >= 1) {
    return {
      numTicks: maxNumTicks < numDays ? numWeeks : numDays,
      tickFormat: formatDay,
    };
  }

  // If we only have a few days, just show the date.
  return { numTicks: maxNumTicks, tickFormat: formatDay };
}

function formatMonth(date: Date): string {
  const MMM = formatUTCDateTime(date, DateFormat.MMM);
  const YY = formatUTCDateTime(date, DateFormat.YY);
  return date.getUTCMonth() === 0 ? `${MMM}'${YY}` : MMM;
}

function formatDay(date: Date): string {
  if (date.getUTCDate() === 1 && date.getUTCMonth() === 0) {
    return formatUTCDateTime(date, DateFormat.MMM_D_YYYY);
  } else {
    return formatUTCDateTime(date, DateFormat.MMM_D);
  }
}
