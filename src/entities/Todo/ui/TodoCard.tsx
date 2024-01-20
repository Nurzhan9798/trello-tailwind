import { todosActions } from "entities/Todo";
import { ChangeEvent, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "shared/hooks/useAppDispatch";
import { Todo } from "../model/types/todo";
import EditIcon from "shared/assets/icons/edit.svg";
import AvatarImg from "shared/assets/icons/avatar.png";

interface TodoCardProps {
  className?: string;
  todo: Todo;
}

export const TodoCard = (props: TodoCardProps) => {
  const { todo } = props;
  const dispatch = useAppDispatch();

  const [task, setTask] = useState(todo.task);
  const [isEditable, setIsEditable] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
    dispatch(todosActions.updateTodoById({ ...todo, task: task }));
  };

  const toggleEditing = () => {
    setIsEditable(!isEditable);
  };

  const disableEditing = () => {
    setIsEditable(false);
  };

  return (
    <Draggable
      draggableId={"todoDraggableId-" + todo.id.toString()}
      index={todo.order}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="hover:bg-grey-lighter flex cursor-pointer cursor-pointer flex-col space-y-4 rounded border border-b border-black bg-white p-2"
        >
          {isEditable ? (
            <textarea
              className="bg-white-100 w-full resize-none rounded-lg border border-black p-2 font-medium outline-1 outline-sky-900 focus:bg-white"
              value={task}
              onChange={handleInputChange}
              rows={3}
              onBlur={disableEditing}
            />
          ) : (
            <p className="w-full overflow-hidden font-medium">{task}</p>
          )}
          <div className="flex items-center justify-between">
            <button onClick={toggleEditing}>
              <EditIcon width={20} height={20} />
            </button>
            <img
              src={AvatarImg}
              className="h-8 rounded-full border border-black"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
