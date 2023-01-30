import { ColumnDefinition } from "./interfaces";

/**
 * Represents sorting directions for a column.
 *
 * Note: It will be better to use "ascending" and "descending" as values for
 * the enum so we can use the value for the aria-sort property, but MUI's
 * SortDirection uses "asc" and "desc".
 * */
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Interface to represent the sorting state of the table.
 */
export interface TableSortState {
  sortColumnId: string;
  sortDirection: SortDirection;
}

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

/**
 * Sort the rows using the sorting column and direction provided in the
 * sortState parameter.
 *
 * @param rows
 * @param columns
 * @param sortState
 * @returns A sorted copy of the rows.
 */
export function sortTableRows<R>(
  rows: R[],
  columns: ColumnDefinition<R>[],
  sortState: TableSortState
) {
  const { sortColumnId, sortDirection } = sortState;
  const sortColumn = columns.find((column) => column.columnId === sortColumnId);
  return sortRows(rows, sortDirection, sortColumn?.sorterAsc);
}
