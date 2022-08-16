/**
 * Type coerces a given value to boolean if possible, else throws an error.
 *
 * Null values are accepted and cast as boolean, to be consistent with MetricData convention.
 *
 * @param value value to convert to boolean.
 * @returns value converted to boolean.
 */
export function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean" || value === null) {
    return value as boolean;
  } else if (typeof value === "number") {
    if ([0, 1].includes(value)) {
      return Boolean(value);
    }
  } else if (typeof value === "string") {
    const lowerCaseValue = value.toLocaleLowerCase();
    if (["yes", "true"].includes(lowerCaseValue)) {
      return true;
    } else if (["no", "false"].includes(lowerCaseValue)) {
      return false;
    }
  }
  throw new Error(`Cannot coerce ${value} to boolean.`);
}
