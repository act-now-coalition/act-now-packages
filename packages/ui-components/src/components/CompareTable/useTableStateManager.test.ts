import { act, renderHook } from "@testing-library/react";
import { SortDirection } from "../../common/utils/compare";
import { useTableStateManager } from "./useTableStateManager";

describe("useTableStateManager", () => {
  const initialState = {
    sortColumnId: "population",
    sortDirection: SortDirection.ASC,
  };

  test("initialize state correctly", () => {
    const { result } = renderHook(() => useTableStateManager(initialState));
    expect(result.current.sortColumnId).toBe(initialState.sortColumnId);
    expect(result.current.sortDirection).toBe(initialState.sortDirection);
    expect(typeof result.current.setSortDirection).toBe("function");
    expect(typeof result.current.setSortingColumn).toBe("function");
  });

  test("update sorting column", () => {
    const { result } = renderHook(() => useTableStateManager(initialState));
    act(() => result.current.setSortingColumn("name"));
    expect(result.current.sortColumnId).toBe("name");
    expect(result.current.sortDirection).toBe(initialState.sortDirection);
  });

  test("update sort direction", () => {
    const { result } = renderHook(() => useTableStateManager(initialState));
    act(() => result.current.setSortDirection(SortDirection.DESC));
    expect(result.current.sortColumnId).toBe(initialState.sortColumnId);
    expect(result.current.sortDirection).toBe(SortDirection.DESC);
  });
});
