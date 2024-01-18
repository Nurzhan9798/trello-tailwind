import { ChangeEvent, useState } from "react";
import { todoColumnsActions } from "./entities/Todo/model/slices/todosSlice";
import { TodoColumn } from "./entities/Todo/model/types/todo";
import { useAppDispatch } from "./shared/hooks/useAppDispatch";
import TrashIcon from "./shared/assets/icons/trash.svg";

interface CardListHeaderProps {
  column: TodoColumn;
}

export const ColumnHeader = (props: CardListHeaderProps) => {
  const { column } = props;
  const [columnName, setColumnName] = useState(column.name);
  const dispatch = useAppDispatch();

  const onColumnNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
    // TODO useDebounce
    dispatch(
      todoColumnsActions.updateColumn({
        id: column.id,
        name: e.target.value,
        order: column.order,
      }),
    );
  };

  const deleteColumn = () => {
    dispatch(todoColumnsActions.deleteColumnById(column.id));
  };

  return (
    <div className="flex items-center justify-between bg-yellow-100 p-2 pr-4">
      <input
        className="w-3/4 rounded-lg bg-transparent p-2 font-medium outline-1 outline-sky-900 focus:bg-white"
        value={columnName}
        onChange={onColumnNameChange}
      />
      <button onClick={deleteColumn}>
        <TrashIcon width={20} height={20} />
      </button>
    </div>
  );
};
