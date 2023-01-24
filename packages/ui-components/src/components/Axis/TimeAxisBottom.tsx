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
  const maxTickLabelWidth = 70;
  const maxNumTicks = Math.floor(width / maxTickLabelWidth);

  const numDays = getTimeDiff(endDate, startDate, TimeUnit.DAYS);
  const numWeeks = getTimeDiff(endDate, startDate, TimeUnit.WEEKS);
  const numMonths = getTimeDiff(endDate, startDate, TimeUnit.MONTHS);
  const numYears = getTimeDiff(endDate, startDate, TimeUnit.YEARS);

  if (getTimeDiff(endDate, startDate, TimeUnit.YEARS) >= 4) {
    return {
      numTicks: Math.min(maxNumTicks, numYears),
      tickFormat: formatYear,
    };
  }

  if (getTimeDiff(endDate, startDate, TimeUnit.MONTHS) >= 6) {
    return {
      numTicks: maxNumTicks,
      tickFormat: formatMonth,
    };
  }

  if (getTimeDiff(endDate, startDate, TimeUnit.MONTHS) >= 1) {
    return {
      numTicks: width / numWeeks < maxTickLabelWidth ? numMonths : numWeeks,
      tickFormat: formatDay,
    };
  }

  if (getTimeDiff(endDate, startDate, TimeUnit.WEEKS) >= 1) {
    return {
      numTicks: maxNumTicks < numDays ? numWeeks : numDays,
      tickFormat: formatDay,
    };
  }

  return {
    numTicks: maxNumTicks,
    tickFormat: (date) => formatUTCDateTime(date, DateFormat.YYYY_MM_DD),
  };
}

function formatMonth(date: Date): string {
  const MMM = formatUTCDateTime(date, DateFormat.MMM);
  const YY = formatUTCDateTime(date, DateFormat.YY);
  return date.getUTCMonth() === 0 ? `${MMM}'${YY}` : MMM;
}

function formatDay(date: Date): string {
  if (date.getUTCDate() === 1 && date.getUTCMonth() === 0) {
    return formatMonth(date);
  } else {
    return formatUTCDateTime(date, DateFormat.MMM_D);
  }
}

function formatYear(date: Date): string {
  return formatUTCDateTime(date, DateFormat.YYYY);
}
