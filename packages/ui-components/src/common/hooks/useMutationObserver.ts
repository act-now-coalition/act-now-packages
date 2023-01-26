import { RefObject, useEffect, useMemo } from "react";

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
  if (!options) {
    options = {};
  }

  const observer = useMemo(
    () => (isSSR ? null : new MutationObserver(callback)),
    [callback]
  );

  useEffect(() => {
    const target = ref?.current;
    if (observer && target) {
      observer.observe(target, options);
      // Disconnect/shutdown observer on hook cleanup.
      return () => observer.disconnect();
    }
  }, [ref, observer, options]);
}

export const isSSR = !(
  typeof window !== "undefined" && window.document?.createElement
);
