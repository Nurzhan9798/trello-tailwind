import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";

const initialState: Todo[] = [
  {
    id: 1,
    order: 1,
    task: "Todo task",
    columnId: 1,
  },
  {
    id: 2,
    order: 1,
    task: "OnGoing task",
    columnId: 2,
  },
  {
    id: 3,
    order: 1,
    task: "Completed task 3",
    columnId: 3,
  },
  {
    id: 4,
    order: 2,
    task: "Completed task 4",
    columnId: 3,
  },
  {
    id: 5,
    order: 3,
    task: "Completed task 5",
    columnId: 3,
  },
  {
    id: 6,
    order: 4,
    task: "Completed task 6",
    columnId: 3,
  },
];

export const todosSlice = createSlice({
  name: "todosSlice",
  initialState: initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      const columnTodos = state.filter(
        (t) => t.columnId === action.payload.columnId,
      );
      const maxOrderByColumnId =
        Math.max(...columnTodos.map((t) => t.order)) + 1;
      const newTodoId = Math.max(...state.map((t) => t.id)) + 1;
      state.push({
        ...action.payload,
        id: newTodoId,
        order: maxOrderByColumnId,
      });
    },
    sortTodosInColumn: (
      state,
      action: PayloadAction<{
        todoId: number;
        sourceOrder: number;
        destinationOrder: number;
        destinationColumnId: number;
        sourceColumnId: number;
      }>,
    ) => {
      const {
        todoId,
        sourceOrder,
        destinationOrder,
        destinationColumnId,
        sourceColumnId,
      } = action.payload;
      if (sourceColumnId === destinationColumnId) {
        if (destinationOrder === sourceOrder) return state;
        let isUp = destinationOrder < sourceOrder;

        state.forEach((todo) => {
          if (
            isUp &&
            todo.columnId === destinationColumnId &&
            todo.order >= destinationOrder &&
            todo.order < sourceOrder
          ) {
            todo.order++;
          } else if (
            !isUp &&
            todo.columnId === destinationColumnId &&
            todo.order <= destinationOrder &&
            todo.order > sourceOrder
          ) {
            todo.order--;
          }
        });

        const todoIndex = state.findIndex((todo) => todo.id === todoId);
        state[todoIndex].order = destinationOrder;
      } else {
        state.forEach((todo) => {
          if (
            todo.columnId === destinationColumnId &&
            todo.order >= destinationOrder
          ) {
            todo.order++;
          }
          if (todo.columnId === sourceColumnId && todo.order > sourceOrder) {
            todo.order--;
          }
        });

        const todoIndex = state.findIndex((todo) => todo.id === todoId);
        console.log(todoIndex);
        state[todoIndex].order = destinationOrder;
        state[todoIndex].columnId = destinationColumnId;
      }
    },
  },
});

export const { actions: todosActions } = todosSlice;
export const { reducer: todosReducer } = todosSlice;
