/**
 * Type coerces a given value to boolean if possible, else throws an error.
 * @param value value to convert to boolean.
 * @returns value converted to boolean.
 */
export function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
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
