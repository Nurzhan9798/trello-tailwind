import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnTodos } from "./ColumnTodos";
import { TodoColumn } from "./entities/Todo/model/types/todo";
import { AddNewTodoFeature } from "./feature/AddNewTodoFeature/AddNewTodoFeature";

interface TodoColumnProps {
  column: TodoColumn;
}

export const Column = (props: TodoColumnProps) => {
  const { column } = props;

  return (
    <div
      key={column.id}
      className="mr-3 shrink-0 grow-0 basis-72  overflow-hidden overflow-y-auto rounded bg-gray-100"
    >
      <ColumnHeader column={column} />
      <ColumnTodos column={column} />
      <AddNewTodoFeature columnId={column.id} />
    </div>
  );
};
