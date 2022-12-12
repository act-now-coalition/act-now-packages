import { useState } from "react";

export function useMultiSelect<T>(
  initialItems: T[]
): [T[], (items: T[]) => void] {
  return useState<T[]>(initialItems);
}
