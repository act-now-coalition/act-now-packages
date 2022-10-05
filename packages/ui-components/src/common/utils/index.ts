export { default as importJson } from "./importJson";
import { formatDecimal } from "@actnowcoalition/number-format";

/**
 * Format the population with thousands separator and keeping 3 significant
 * digits.
 *
 * @example
 * ```ts
 * formatPopulation(107766) // 108,000
 * ```
 */
export function formatPopulation(population: number) {
  return formatDecimal(population, {
    maximumSignificantDigits: 3,
    maximumFractionDigits: 0,
  });
}
