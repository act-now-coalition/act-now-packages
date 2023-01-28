import { useCallback, useEffect, useRef, useState } from "react";

interface UseResizeObserverResult {
  setObservedNode: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  observerEntry: ResizeObserverEntry | null;
}

/** Hook to track element resizing using the ResizeObserver API
 *
 * Interpolated from: https://tobbelindstrom.com/blog/resize-observer-hook/
 *
 * @returns State action dispatch to set the element to observe and the element's
 * resize event data.
 */
export function useResizeObserver(): UseResizeObserverResult {
  const [observerEntry, setObserverEntry] =
    useState<ResizeObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const disconnect = useCallback(() => observer.current?.disconnect?.(), []);
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

  return { setObservedNode: setNode, observerEntry: observerEntry };
}
