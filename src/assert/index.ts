/**
 * Test if the `condition` is truthy. If `condition` is false, it throws
 * an error with an optional message. If the message parameter is missing,
 * it throws an error with a default message.
 */
export function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    fail(msg);
  }
}

/**
 * Throws an Error with the (optionally) provided error message.
 */
export function fail(msg?: string): never {
  throw new Error(`INTERNAL ASSERTION FAILED: ${msg}`);
}
