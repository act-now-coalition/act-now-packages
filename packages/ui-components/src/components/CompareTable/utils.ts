import { SortDirection } from "../../common/utils/compare";

/**
 * Sort the rows using the given sorter function and direction
 */
export function sortRows<R>(
  rows: R[],
  sortDirection: SortDirection,
  sorterAsc?: (a: R, b: R) => number
): R[] {
  if (!sorterAsc) {
    return rows;
  }

  const sortedAsc = [...rows].sort(sorterAsc);
  return sortDirection === SortDirection.ASC ? sortedAsc : sortedAsc.reverse();
}

/**
 * Function that compares two items for sorting (ascending).
 *
 * @example
 * ```tsx
 * compare("a", "b") // -1
 * compare("a", "a") // 0
 * compare(1, 2) // -1
 * [3, 2, 4, 1].sort(compare) // [1, 2, 3, 4]
 * ```
 */
export function compare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
