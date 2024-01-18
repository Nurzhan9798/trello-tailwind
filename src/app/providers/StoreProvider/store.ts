import { configureStore } from "@reduxjs/toolkit";
import {
  todoColumnsReducer,
  todosReducer,
} from "../../../entities/Todo/model/slices/todosSlice";

export const store = configureStore({
  reducer: {
    todoColumns: todoColumnsReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
