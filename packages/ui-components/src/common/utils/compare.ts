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
