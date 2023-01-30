import { RefObject, useEffect, useMemo } from "react";

/**
 * Flag to indicate if the current environment is server-side rendered.
 */
const isSSR = !(
  typeof window !== "undefined" && window.document?.createElement
);

/**
 * Hook to observe for mutations on a DOM element.
 *
 * Interpolated from https://tobbelindstrom.com/blog/useMutationObserver/
 *
 * @param ref Reference object to observe for mutations.
 * @param callback Callback function to execute when a mutation occurs.
 * @param options Options to pass to the MutationObserver.
 */
export function useMutationObserver(
  ref: RefObject<Element> | null,
  callback: MutationCallback,
  options?: MutationObserverInit
): void {
  const observer = useMemo(
    // Ensure the content has been rendered client-side before creating the observer.
    () => (isSSR ? null : new MutationObserver(callback)),
    [callback]
  );

  useEffect(() => {
    const target = ref?.current;
    if (observer && target) {
      observer.observe(target, options ?? {});
      // Disconnect/shutdown observer on hook cleanup.
      return () => observer.disconnect();
    }
  }, [ref, observer, options]);
}
