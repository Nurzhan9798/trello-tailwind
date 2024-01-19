import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo, TodoCard } from "./entities/Todo";
import { TodoColumn } from "./entities/Todo/model/types/todo";
import { useAppDispatch } from "./shared/hooks/useAppDispatch";
import { useAppSelector } from "./shared/hooks/useAppSelector";

interface ColumnTodosProps {
  column: TodoColumn;
}

export const ColumnTodos = (props: ColumnTodosProps) => {
  const { column } = props;
  const todos = useAppSelector((state) => state.todos);
  const [columnTodos, setColumnTodos] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newTodos = todos
      .filter((todo) => todo.columnId === column.id)
      .sort((a, b) => a.order - b.order);

    setColumnTodos(newTodos);
  }, [todos]);

  return (
    <Droppable droppableId={"columnDropId-" + column.id.toString()} type="task">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="p-2"
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
