import { configureStore } from "@reduxjs/toolkit";
import { todoColumnsReducer } from "entities/Column";
import { todosReducer } from "entities/Todo";

export const store = configureStore({
  reducer: {
    todoColumns: todoColumnsReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
