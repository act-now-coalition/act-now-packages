import { Reducer, useReducer } from "react";
import { SortDirection } from "./interfaces";

export interface SortState {
  columnId: string;
  sortDirection: SortDirection;
}

export enum ActionType {
  SET_SORTING_COLUMN = "SET_SORT_COLUMN",
  SET_SORT_DIRECTION = "SET_SORT_DIRECTION",
  SET_SORTING = "SET_SORTING",
}

export type Action =
  | { type: ActionType.SET_SORTING_COLUMN; columnId: string }
  | { type: ActionType.SET_SORT_DIRECTION; sortDirection: SortDirection }
  | {
      type: ActionType.SET_SORTING;
      columnId: string;
      sortDirection: SortDirection;
    };

const sortableTableReducer: Reducer<SortState, Action> = (
  prevState,
  action
) => {
  switch (action.type) {
    case ActionType.SET_SORTING_COLUMN:
      return { ...prevState, columnId: action.columnId };
    case ActionType.SET_SORT_DIRECTION:
      return { ...prevState, sortDirection: action.sortDirection };
    case ActionType.SET_SORTING:
      return {
        ...prevState,
        columnId: action.columnId,
        sortDirection: action.sortDirection,
      };
    default:
      return prevState;
  }
};

export function useSortableTable(initialState: SortState) {
  return useReducer(sortableTableReducer, initialState);
}
