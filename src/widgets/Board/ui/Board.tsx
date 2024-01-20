import { todosActions } from "entities/Todo";
import React, { useLayoutEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Column, todoColumnsActions } from "entities/Column";
import { AddNewColumnFeature } from "feature/AddNewColumnFeature";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { useAppSelector } from "shared/hooks/useAppSelector";

export const Board = () => {
  const todoColumns = useAppSelector((state) => state.todoColumns);
  const [columns, setColumns] = useState(todoColumns);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const newColumns = [...todoColumns].sort((a, b) => a.order - b.order);

    setColumns(newColumns);
  }, [todoColumns]);
  const onTaskDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const todoId = draggableId.split("-")[1];
    const destinationOrder = destination.index;
    const sourceOrder = source.index;
    const destinationColumnId = destination.droppableId.split("-")[1];
    const sourceColumnId = source.droppableId.split("-")[1];
    dispatch(
      todosActions.sortTodosInColumn({
        destinationColumnId: parseInt(destinationColumnId),
        sourceColumnId: parseInt(sourceColumnId),
        sourceOrder: sourceOrder,
        destinationOrder: destinationOrder,
        todoId: parseInt(todoId),
      }),
    );
  };

  const onColumnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const columnId = draggableId.split("-")[1];
    const destinationOrder = destination.index;
    const sourceOrder = source.index;
    dispatch(
      todoColumnsActions.sortTodoColumns({
        sourceOrder: sourceOrder,
        destinationOrder: destinationOrder,
        columnId: parseInt(columnId),
      }),
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result || !result.destination || !result.source) return;
    const { type } = result;
    switch (type) {
      case "task":
        onTaskDragEnd(result);
        break;
      case "column":
        onColumnDragEnd(result);
        break;
      default:
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex grow items-start overflow-x-scroll px-4 py-8"
          >
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
            {provided.placeholder}
            <AddNewColumnFeature />;
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
