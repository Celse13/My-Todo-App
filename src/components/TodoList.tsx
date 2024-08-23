import 'react-toastify/dist/ReactToastify.css';

import { ChangeEvent, useState, FocusEvent } from "react";
import { FaTrash, FaPlay, FaPause } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import * as Dialog from '@radix-ui/react-dialog';

import { todoType } from '@/types/todoType';

import EmptyState from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { Checkbox } from "@/components/ui/checkbox";

import { useFetchTodos } from "@/components/hooks/useTodos/useFetchTodos";
import { useUpdateTodo } from "@/components/hooks/useTodos/useUpdateTodo";
import { useDeleteTodo } from "@/components/hooks/useTodos/useDeleteTodo";
import { useToggleTodoStatus } from "@/components/hooks/useTodos/useToggleTodoStatus";
import { useToggleInProgress } from "@/components/hooks/useTodos/useToggleInProgressMutation";
import { useDialog } from "@/components/hooks/dialogBox/useDialog";
import { useTodoForm } from "@/components/hooks/formValidation/useForm";

const TodoList = () => {
  const [idUpdate, setIdUpdate] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const { data, isLoading, error: fetchError } = useFetchTodos();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();
  const toggleStatusMutation = useToggleTodoStatus();
  const toggleInProgressMutation = useToggleInProgress();

  const { task, errors, setTask, setErrors, validateTask, handleTaskChange } = useTodoForm();
  const { showDialog, todoToDelete, isDeleting, setIsDeleting, openDialog, closeDialog } = useDialog();

  const handleUpdate = (id: number, updatedData: { task: string }) => {
    validateTask(id, updatedData.task);
    if (!errors[id]) {
      setIdUpdate(id);
      updateMutation.mutate({ id, data: updatedData }, {
        onSettled: () => {
          setIdUpdate(null);
          setIsEditing(null);
        }
      });
    }
  };

  const handleToggleCompleted = (id: number, completed: boolean) => {
    toggleStatusMutation.mutate({ id, toggle: { completed: !completed, inProgress: false } });
  };

  const handleToggleProgress = (id: number, inProgress: boolean) => {
    toggleInProgressMutation.mutate({ id, toggle: { inProgress: !inProgress } });
  };

  const handleDelete = (id: number) => {
    openDialog(id);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      setIsDeleting(true);
      deleteMutation.mutate(todoToDelete, {
        onSettled: () => {
          closeDialog();
          setIsDeleting(false);
        }
      });
    }
  };

  const handleTaskBlur = (id: number) => {
    if (!errors[id]) {
      handleUpdate(id, { task });
    }
    setErrors((prevErrors: { [key: number]: string | null }) => ({ ...prevErrors, [id]: null }));
  };

  const handleStartPauseClick = async (todo: todoType) => {
    const toggle = { completed: todo.completed, inProgress: !todo.inProgress };
    if (toggle) {
      await toggleStatusMutation.mutate({ id: todo.id, toggle });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner loading={true} />
      </div>
    );
  }

  if (fetchError) {
    return <div>Error loading todos</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4 flex-grow max-w-4xl mx-auto">
      {data?.todos?.length === 0 ? (
        <EmptyState />
      ) : (
        data?.todos?.map((todo: todoType) => (
          <div key={todo.id} className="bg-white p-4 shadow-md rounded-lg mb-4 transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleCompleted(todo.id, todo.completed)}
                />
                {isEditing === todo.id ? (
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleTaskChange(todo.id, e)}
                    onBlur={() => handleTaskBlur(todo.id)}
                    autoFocus
                    className="px-2 py-1 border-none focus:outline-none w-full"
                  />
                ) : (
                  <span
                    onClick={() => {
                      setIsEditing(todo.id);
                      setTask(todo.task);
                    }}
                    className={`cursor-pointer font-medium text-gray-800 ${todo.completed ? 'line-through' : ''}`}
                  >
                    {todo.task}
                  </span>
                )}
                {todo.inProgress && (
                  <span className="text-yellow-500 ml-4 whitespace-nowrap">In Progress</span>
                )}
              </div>
              <div className="todo-controls flex space-x-2">
                <button
                  className="todo-button p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-shadow shadow-md"
                  onClick={() => handleStartPauseClick(todo)}
                >
                  {todo.inProgress ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  className="todo-button p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-shadow shadow-md"
                  onClick={() => handleDelete(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {errors[todo.id] && <p className="text-red-500 mt-2">{errors[todo.id]}</p>}
          </div>
        ))
      )}
      <ToastContainer />
      <Dialog.Root open={showDialog} onOpenChange={closeDialog}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed bg-[#F5F5F5] p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-medium">Confirm Delete</Dialog.Title>
          <Dialog.Description className="mt-2">Are you sure you want to delete this todo?</Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={closeDialog} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button onClick={confirmDelete} className="px-4 py-2 bg-rose-500 text-white rounded" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default TodoList;
