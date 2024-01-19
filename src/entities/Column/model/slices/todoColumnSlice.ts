import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoColumn } from "entities/Column";

export const todoColumnsInitialState: TodoColumn[] = [
  {
    id: 1,
    name: "TODO",
    order: 1,
  },
  {
    id: 2,
    name: "OnGoing",
    order: 2,
  },
  {
    id: 3,
    name: "Completed",
    order: 3,
  },
];
export const todoColumnsSlice = createSlice({
  name: "todoColumnsSlice",
  initialState: todoColumnsInitialState,
  reducers: {
    updateColumn: (state, action: PayloadAction<TodoColumn>) => {
      const columnIndex = state.findIndex(
        (col) => col.id === action.payload.id,
      );
      if (columnIndex !== -1) state[columnIndex] = { ...action.payload };
    },
    addNewColumn: (state, action: PayloadAction<string>) => {
      const newColumnId = Math.max(...state.map((c) => c.id)) + 1;
      const newColumn = {
        name: action.payload,
        id: newColumnId,
        order: newColumnId,
      };
      state.push(newColumn);
    },
    deleteColumnById: (state, action: PayloadAction<number>) => {
      return state.filter((column) => column.id !== action.payload);
    },
    sortTodoColumns: (
      state,
      action: PayloadAction<{
        columnId: number;
        sourceOrder: number;
        destinationOrder: number;
      }>,
    ) => {
      const { sourceOrder, destinationOrder, columnId } = action.payload;
      if (sourceOrder === destinationOrder) return state;
      const isUp = destinationOrder < sourceOrder;
      state.forEach((column) => {
        if (isUp) {
          if (column.order >= destinationOrder && column.order < sourceOrder)
            column.order++;
        } else {
          if (column.order > sourceOrder && column.order <= destinationOrder) {
            column.order--;
          }
        }
      });
      const columnIndex = state.findIndex((column) => column.id === columnId);
      state[columnIndex].order = destinationOrder;
    },
  },
});

export const { actions: todoColumnsActions } = todoColumnsSlice;
export const { reducer: todoColumnsReducer } = todoColumnsSlice;
