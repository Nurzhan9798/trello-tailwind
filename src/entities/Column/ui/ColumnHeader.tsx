import { ChangeEvent, useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import DragIcon from "shared/assets/icons/drag.svg";
import TrashIcon from "shared/assets/icons/trash.svg";
import { TodoColumn } from "../model/types/column";

interface CardListHeaderProps {
  column: TodoColumn;
  onColumnDelete: () => void;
  onColumnNameChange: (columnName: string) => void;
  handleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export const ColumnHeader = (props: CardListHeaderProps) => {
  const { column, handleProps, onColumnDelete, onColumnNameChange } = props;
  const [columnName, setColumnName] = useState(column.name);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value);
    onColumnNameChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-yellow-100 p-2 pr-4">
      <input
        className="w-3/4 rounded-lg bg-transparent p-2 font-medium outline-1 outline-sky-900 focus:bg-white"
        value={columnName}
        onChange={handleInputChange}
      />
      <div {...handleProps}>
        <DragIcon width={20} height={20} />
      </div>
      <button onClick={onColumnDelete}>
        <TrashIcon width={20} height={20} />
      </button>
    </div>
  );
};
