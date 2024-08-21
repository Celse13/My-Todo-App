import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from "react";
import { FaTrash, FaPlay, FaPause } from "react-icons/fa";
import { updateTodo, deleteTodo, fetchTodos, toggleTodoStatus, toggleTodoProgressStatus } from "@/components/hooks/TodoQueries";
import Spinner from "@/components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { todoType } from '@/types/todoType';
import { Checkbox } from "@/components/ui/checkbox";
import * as Dialog from '@radix-ui/react-dialog';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from "@/components/Motion";

const TodoList = () => {
  const [id, setId] = useState<number | null>(null);
  const [idUpdate, setIdUpdate] = useState<number | null>(null);
  const [task, setTask] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryFn: fetchTodos,
    queryKey: ['todos'],
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { task: string } }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      toast.success("Todo updated successfully");
    }
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success("Todo deleted successfully");
    }
  });

  const handleUpdate = (id: number, updatedData: { task: string }) => {
    setIdUpdate(id);
    updateMutation({ id, data: updatedData }, {
      onSettled: () => {
        setIdUpdate(null);
        setIsEditing(null);
      }
    });
  };

  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: ({ id, toggle }: { id: number; toggle: { completed: boolean, inProgress: boolean } }) =>
      toggleTodoStatus(id, toggle),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      toast.success("Todo status toggled successfully");
    }
  });

  const { mutate: toggleInProgressMutation } = useMutation({
    mutationFn: ({ id, toggle }: { id: number; toggle: { inProgress: boolean } }) =>
      toggleTodoProgressStatus(id, toggle),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      toast.success("Todo progress status toggled successfully");
    }
  });

  const handleToggleCompleted = (id: number, completed: boolean) => {
    toggleStatusMutation({ id, toggle: { completed: !completed, inProgress: false } });
  };

  const handleToggleProgress = (id: number, inProgress: boolean) => {
    toggleInProgressMutation({ id, toggle: { inProgress: !inProgress } });
  };

  const handleDelete = (id: number) => {
    setTodoToDelete(id);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      setIsDeleting(true);
      deleteMutation(todoToDelete, {
        onSettled: () => {
          setTodoToDelete(null);
          setShowDialog(false);
          setIsDeleting(false);
        }
      });
    }
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = async (todo: todoType) => {
    await updateMutation({ id: todo.id, data: { task } });
    setIsEditing(null);
  };

  const handleStartPauseClick = async (todo: todoType) => {
    await toggleStatusMutation({ id: todo.id, toggle: { completed: todo.completed, inProgress: !todo.inProgress } });
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center">
          <Spinner loading={true} />
        </div>
    );
  }

  if (error) {
    return <div>Error loading todos</div>;
  }

  return (
      <div className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4 flex-grow max-w-4xl mx-auto">
        {data?.todos?.length === 0 ? (
            <EmptyState />
        ) : (
            data?.todos?.map((todo: todoType) => (
                <div key={todo.id} className="bg-gray-100 p-4 shadow-lg rounded-lg mb-4">
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
                              onChange={handleTaskChange}
                              onBlur={() => handleTaskSubmit(todo)}
                              autoFocus
                              className="px-2 border-none focus:outline-none w-full bg-gray-100"
                          />
                      ) : (
                          <span
                              onClick={() => {
                                setIsEditing(todo.id);
                                setTask(todo.task);
                              }}
                              className={`cursor-pointer font-medium text-gray-800 bg-gray-100 w-full ${todo.completed ? 'line-through' : ''}`}
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
                          className="todo-button p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => handleStartPauseClick(todo)}
                      >
                        {todo.inProgress ? <FaPause /> : <FaPlay />}
                      </button>
                      <button
                          className="todo-button p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => handleDelete(todo.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
            ))
        )}
        <ToastContainer />
        <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed bg-[#F5F5F5] p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-medium">Confirm Delete</Dialog.Title>
            <Dialog.Description className="mt-2">Are you sure you want to delete this todo?</Dialog.Description>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowDialog(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Yes'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
  );
};

export default TodoList;
