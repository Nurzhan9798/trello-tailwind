import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../model/types/todo";

interface TodoCardProps {
  className?: string;
  todo: Todo;
}

export const TodoCard = (props: TodoCardProps) => {
  const { todo } = props;

  return (
    <Draggable draggableId={todo.id.toString()} index={todo.order}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-grey hover:bg-grey-lighter cursor-pointer rounded border-b bg-white p-2"
        >
          <input value={todo.task} />
          <div className="text-grey-darker ml-2 mt-8 flex items-start justify-between">
            <span className="flex items-center text-xs">
              <svg
                className="mr-1 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
              </svg>
              3/5
            </span>
            <img
              src="https://lh3.googleusercontent.com/-_5j0-dxnWUA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucns2T5LKXwqhI3qVQhrAaH99RdlLA/photo.jpg?sz=46"
              className="h-8 rounded-full"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
