import { useEffect, useState, useCallback, useRef } from "react";

/** Hook to track element resizing using the ResizeObserver API
 *
 * Interpolated from: https://tobbelindstrom.com/blog/resize-observer-hook/
 */
export const useResizeObserver = () => {
  const [observerEntry, setObserverEntry] =
    useState<ResizeObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
    if (node) {
      observer.current.observe(node);
    }
  }, [node]);

  useEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return { ref: setNode, observerEntry: observerEntry };
};
