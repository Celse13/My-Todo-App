import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from "react";
import { todoType } from "@/types/todoType";
import { FaTrash, FaEdit, FaPlay, FaPause } from "react-icons/fa";
import { updateTodo, deleteTodo } from "@/components/hooks/TodoQueries";
import { TodoFunctions } from "@/types/todoFunctions";

interface Props extends TodoFunctions {
  todo: todoType;
}

const Todo = ({ todo, changeTodoTask, changeTodoCompleted, deleteTodo, editTodo, startTodo, changeTodoInProgress }: Props) => {
  const [task, setTask] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = async () => {
    await updateMutation({ ...todo, task });
    setIsEditing(false);
  };

  const handleStartPauseClick = async () => {
    await changeTodoInProgress(todo.id, !todo.inProgress);
  };

  const handleDeleteClick = async () => {
    await deleteMutation(todo.id);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            checked={todo.completed}
            onChange={() => changeTodoCompleted(todo.id)}
            className="todo-radio"
          />
          {isEditing ? (
            <input
              type="text"
              value={task}
              onChange={handleTaskChange}
              onBlur={handleTaskSubmit}
              autoFocus
              className="todo-input px-2 py-1"
            />
          ) : (
            <span onClick={() => setIsEditing(true)} className="todo-task cursor-pointer mr-4">
              {task}
            </span>
          )}
          {todo.inProgress && <span className="text-yellow-500 ml-4">In Progress</span>}
        </div>
        <div className="todo-controls flex space-x-2">
          <button className="todo-button todo-start mr-2" onClick={handleStartPauseClick}>
            {todo.inProgress ? <FaPause /> : <FaPlay />}
          </button>
          <button className="todo-button todo-delete" onClick={handleDeleteClick}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
