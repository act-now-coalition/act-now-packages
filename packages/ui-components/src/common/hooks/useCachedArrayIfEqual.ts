import isEqual from "lodash/isEqual";
import { useRef } from "react";

/**
 * Helper react hook to cache / return an array value, as long as the contents
 * are equal.
 *
 * As long as the new array contains the exact same values (i.e. each item `===`
 * the previous values), then the original cached array will be returned. This is
 * useful when using the array as a dependency in react, e.g. with `useEffect()`
 * where you want to avoid re-running the effect as long as the array is equal
 * to the old array.
 *
 * @param value New array to check against the cached array.
 * @returns The cached array if its contents is exactly equal to the new value, else the new value.
 */
export function useCachedArrayIfEqual<T>(value: Array<T>): Array<T> {
  const ref = useRef(value);
  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
}
