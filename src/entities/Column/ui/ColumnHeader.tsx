import { ChangeEvent, useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import DragIcon from "shared/assets/icons/drag.svg";
import EditIcon from "shared/assets/icons/edit.svg";
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
  const [isEditable, setIsEditable] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setColumnName(e.target.value);
    onColumnNameChange(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditable(!isEditable);
  };

  const disableEditing = () => {
    setIsEditable(false);
  };

  return (
    <div className="flex items-center justify-between bg-yellow-100 p-2 pr-4">
      {isEditable ? (
        <textarea
          className="bg-white-100 w-1/2 resize-none rounded-lg border border-black p-2 font-medium outline-1 outline-sky-900 focus:bg-white"
          value={columnName}
          onChange={handleInputChange}
          rows={3}
          onBlur={disableEditing}
        />
      ) : (
        <p className="w-1/2 overflow-hidden bg-transparent p-2 font-medium">
          {columnName}
        </p>
      )}

      <div {...handleProps}>
        <DragIcon width={20} height={20} />
      </div>
      <button onClick={toggleEditing}>
        <EditIcon width={20} height={20} />
      </button>
      <button onClick={onColumnDelete}>
        <TrashIcon width={20} height={20} />
      </button>
    </div>
  );
};
