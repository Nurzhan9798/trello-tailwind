import { todoColumnsActions } from "../model/slices/todoColumnSlice";
import { Draggable } from "react-beautiful-dnd";
import { AddNewTodoFeature } from "feature/AddNewTodoFeature";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { ColumnHeader } from "./ColumnHeader";
import { ColumnTodos } from "./ColumnTodos";
import { TodoColumn } from "../model/types/column";

interface ColumnProps {
  column: TodoColumn;
}

export const Column = (props: ColumnProps) => {
  const { column } = props;
  const dispatch = useAppDispatch();

  const onColumnDelete = () => {
    dispatch(todoColumnsActions.deleteColumnById(column.id));
  };

  const onColumnNameChange = (columnName: string) => {
    dispatch(
      todoColumnsActions.updateColumn({
        id: column.id,
        name: columnName,
        order: column.order,
      }),
    );
  };

  return (
    <Draggable
      draggableId={"columnDraggableId-" + column.id.toString()}
      index={column.order}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mr-3 shrink-0 grow-0 basis-64  overflow-hidden overflow-y-auto rounded bg-gray-200"
        >
          <ColumnHeader
            handleProps={provided.dragHandleProps}
            column={column}
            onColumnDelete={onColumnDelete}
            onColumnNameChange={onColumnNameChange}
          />
          <ColumnTodos column={column} />
          <AddNewTodoFeature columnId={column.id} />
        </div>
      )}
    </Draggable>
  );
};
