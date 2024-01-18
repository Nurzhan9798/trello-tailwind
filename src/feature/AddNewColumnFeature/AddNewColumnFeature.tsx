import { ChangeEvent, useState } from "react";
import {
  todoColumnsActions,
  todosActions,
} from "../../entities/Todo/model/slices/todosSlice";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";

interface AddNewColumnFeatureProps {}

export const AddNewColumnFeature = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnName, setColumnName] = useState("");
  const dispatch = useAppDispatch();

  const showAddingColumn = () => {
    setIsAddingColumn(true);
  };

  const hideAddingColumn = () => {
    setIsAddingColumn(false);
    setColumnName("");
  };

  const addNewColumn = () => {
    if (columnName) dispatch(todoColumnsActions.addNewColumn(columnName));
    setColumnName("");
    setIsAddingColumn(false);
  };
  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setColumnName(e.target.value);
  };

  if (!isAddingColumn)
    return (
      <button
        className="shrink-0 grow-0 basis-72 rounded bg-gray-100 bg-opacity-50 px-4 py-2 hover:bg-gray-200 hover:bg-opacity-100"
        onClick={showAddingColumn}
      >
        Add new cart
      </button>
    );

  return (
    <div className="shrink-0 grow-0 basis-72 rounded bg-gray-100 p-2 ">
      <textarea
        rows={3}
        className="w-full resize-none rounded-md p-2"
        placeholder="Enter title"
        value={columnName}
        onChange={onTextAreaChange}
      />
      <div className="grid grid-cols-2 gap-2">
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={addNewColumn}
        >
          Add
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={hideAddingColumn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
