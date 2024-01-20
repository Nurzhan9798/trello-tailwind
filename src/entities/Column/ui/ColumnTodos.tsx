import { Todo, TodoCard } from "entities/Todo";
import React, { useLayoutEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { TodoColumn } from "../model/types/column";

interface ColumnTodosProps {
  column: TodoColumn;
}

export const ColumnTodos = (props: ColumnTodosProps) => {
  const { column } = props;
  const todos = useAppSelector((state) => state.todos);
  const [columnTodos, setColumnTodos] = useState<Todo[]>([]);

  useLayoutEffect(() => {
    const newTodos = todos
      .filter((todo) => todo.columnId === column.id)
      .sort((a, b) => a.order - b.order);

    setColumnTodos(newTodos);
  }, [todos]);

  return (
    <Droppable droppableId={"columnDropId-" + column.id.toString()} type="task">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2 p-2"
        >
          {columnTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
