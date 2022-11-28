import { useReducer } from "react";
import { SortDirection } from "../../common/utils/compare";

export interface TableState {
  sortColumnId: string;
  sortDirection: SortDirection;
}

export interface TableStateManager extends TableState {
  setSortDirection: (sortDirection: SortDirection) => void;
  setSortingColumn: (sortColumnId: string) => void;
}

/**
 * Hook to access and update the state of the CompareTable component. There
 * are cases when we want to set the initial state of the table, or when
 * we want to update its state by interacting with an element outside the
 * table (by clicking a button, for example).
 *
 * @example
 * ```tsx
 * const initialState = {
 *   sortColumnId: "population",
 *   sortDirection: SortDirection.DESC
 * };
 * const stateManager = useTableStateManager(initialState);
 *
 * return (
 *   <>
 *     <Button onClick={() => stateManager.setSortingColumn("name")}>
 *       Sort by Name
 *     </Button>
 *     <CompareTable
 *       rows={rows}
 *       columns={columns}
 *       stateManager={stateManager}
 *     />
 *   </>
 * );
 * ```
 */
export function useTableStateManager(
  tableState: TableState
): TableStateManager {
  const [state, dispatch] = useReducer(tableStateReducer, tableState);
  return {
    ...state,
    setSortDirection(sortDirection: SortDirection) {
      dispatch({ type: ActionType.SET_SORT_DIRECTION, sortDirection });
    },
    setSortingColumn(sortColumnId: string) {
      dispatch({ type: ActionType.SET_SORTING_COLUMN, sortColumnId });
    },
  };
}

enum ActionType {
  SET_SORT_DIRECTION = "SET_SORT_DIRECTION",
  SET_SORTING_COLUMN = "SET_SORTING_COLUMN",
}

type TableAction =
  | {
      type: ActionType.SET_SORTING_COLUMN;
      sortColumnId: string;
    }
  | {
      type: ActionType.SET_SORT_DIRECTION;
      sortDirection: SortDirection;
    };

function tableStateReducer(
  prevState: TableState,
  action: TableAction
): TableState {
  switch (action.type) {
    case ActionType.SET_SORTING_COLUMN:
      return { ...prevState, sortColumnId: action.sortColumnId };
    case ActionType.SET_SORT_DIRECTION:
      return { ...prevState, sortDirection: action.sortDirection };
    default:
      return prevState;
  }
}
