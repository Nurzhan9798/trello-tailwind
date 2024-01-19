import { ChangeEvent, useState } from "react";
import { todosActions } from "entities/Todo";
import { useAppDispatch } from "shared/hooks/useAppDispatch";

interface AddNewTodoFeatureProps {
  columnId: number;
}

export const AddNewTodoFeature = (props: AddNewTodoFeatureProps) => {
  const { columnId } = props;
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useAppDispatch();

  const showAddingTodo = () => {
    setIsAddingTodo(true);
  };

  const hideAddingTodo = () => {
    setIsAddingTodo(false);
    setTodoTitle("");
  };

  const addNewTodo = () => {
    if (todoTitle) {
      dispatch(
        todosActions.addNewTodo({
          id: 0,
          order: 0,
          task: todoTitle,
          columnId: columnId,
        }),
      );
    }
    setTodoTitle("");
    setIsAddingTodo(false);
  };
  const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoTitle(e.target.value);
  };

  return (
    <div className="p-2">
      {isAddingTodo ? (
        <>
          <textarea
            rows={3}
            className="w-full resize-none rounded-md p-2"
            placeholder="Enter task"
            value={todoTitle}
            onChange={onTextAreaChange}
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={addNewTodo}
            >
              Add
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={hideAddingTodo}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={showAddingTodo}
        >
          Add new cart
        </button>
      )}
    </div>
  );
};
