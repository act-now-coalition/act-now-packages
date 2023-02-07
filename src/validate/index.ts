/**
 * Test if the `condition` is truthy. If `condition` is false, it throws
 * an error with an optional message. If the message parameter is missing,
 * it throws an error with a default message.
 */
export function validate(
  condition: unknown,
  errorMessage?: string
): asserts condition {
  if (!condition) {
    throw new ActNowJsError(errorMessage);
  }
}

/**
 * Throws an Error with the (optionally) provided error message.
 */
export function throwError(errorMessage?: string): never {
  throw new ActNowJsError(errorMessage);
}

/**
 * An ActNowJsError class to differentiate from default and internal errors.
 */
export class ActNowJsError extends Error {
  constructor(public readonly errorMessage?: string) {
    super(errorMessage);
    this.name = "ActNowJsError";
  }
}
