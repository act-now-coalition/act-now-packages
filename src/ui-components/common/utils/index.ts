import { formatInteger } from "../../../number-format";

export { default as importJson } from "./importJson";

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
  return formatInteger(population, {
    maximumSignificantDigits: 3,
  });
}
