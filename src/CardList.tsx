import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./Column";
import { todosActions } from "./entities/Todo/model/slices/todosSlice";
import { AddNewColumnFeature } from "./feature/AddNewColumnFeature/AddNewColumnFeature";
import { useAppDispatch } from "./shared/hooks/useAppDispatch";
import { useAppSelector } from "./shared/hooks/useAppSelector";

export const CardList = () => {
  const todoColumns = useAppSelector((state) => state.todoColumns);
  const dispatch = useAppDispatch();
  const onDragEnd = (result: DropResult) => {
    if (!result || !result.destination || !result.source) return;
    const todoId = result.draggableId;
    const destinationOrder = result.destination.index;
    const sourceOrder = result.source.index;
    const destinationColumnId = result.destination.droppableId;
    const sourceColumnId = result.source.droppableId;
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
  return (
    <div className="flex grow items-start overflow-x-scroll px-4 py-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {todoColumns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddNewColumnFeature />
      </DragDropContext>
    </div>
  );
};
