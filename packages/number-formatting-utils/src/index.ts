/**
 * Format a number as an integer, rounding to the closest integer if necessary.
 *
 * @example
 * formatInteger(1.9)   // "2"
 * formatInteger(1.1)   // "1"
 * formatInteger(15999) // "15,999"
 *
 * @param value Number to format
 * @returns Formatted number (as string)
 */
export function formatInteger(value: number): string {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number using fixed point notation, rounding to the amount of decimal places specified
 * by the places param, or rounded to 2 decimal places if no places param is provided.
 *
 * @example
 * formatDecimal(1.2345)    // "1.23"
 * formatDecimal(1.2345, 3) // "1.234"
 *
 * @param value Number to format
 * @param places Number of decimal places to round to (defaults to 2)
 * @returns Formatted decimal (as string)
 */
export const formatDecimal = (value: number, places = 2): string => {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: places,
  }).format(value);
};

/**
 * Format a percentage representation of a number, rounding to the amount of decimal places specified
 * by the places param, or rounded to the nearest whole integer if no places param is provided.
 *
 * @example
 * formatPercent(0.85)      // 85%
 * formatPercent(0.8567, 2) // 85.67%
 *
 * @param value Number to format
 * @param places Number of decimal places to round to (defaults to 0)
 * @returns Formatted percentage (as string)
 */

export function formatPercent(value: number, places = 0): string {
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: places,
  }).format(value);
}

/**
 * Format a number in millions. It receives (optionally) the same options
 * as `Intl.NumberFormat`.
 *
 * @example
 * formatMillions(1_555_000) // "1.56"
 * formatMillions(1_555_000, { minimumFractionDigits: 3 }) // "1.555"
 *
 * @param value Number to format
 * @param options Formatting options
 * @returns Formatted number (as string)
 */
export function formatMillions(
  value: number,
  options?: Intl.NumberFormatOptions | undefined
): string {
  return new Intl.NumberFormat(
    undefined,
    options ?? { maximumSignificantDigits: 3 }
  ).format(value / 1_000_000);
}

/**
 * Format a number in billions. It receives (optionally) the same options
 * as `Intl.NumberFormat`.
 *
 * @example
 * formatBillions(1_888_000_000) // "1.88"
 * formatBillions(1_888_000_000, { minimumFractionDigits: 3 }) // "1.888"
 *
 * @param value Number to format
 * @param options Formatting options
 * @returns Formatted number (as string)
 */
export function formatBillions(
  value: number,
  options?: Intl.NumberFormatOptions | undefined
): string {
  return new Intl.NumberFormat(
    undefined,
    options ?? { maximumSignificantDigits: 3 }
  ).format(value / 1_000_000_000);
}
