import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState, FocusEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { FaPlus } from "react-icons/fa";
import { addTodo } from "@/components/hooks/TodoQueries";
import { todoSchema } from "@/lib/todoSchema";
import { z } from "zod";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate }  = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      // toast.success('Task added successfully');
      setTask('');
      setError(null);
    },
    onError: (error: any) => {
      console.error('Error adding task:', error);
    },
  });

  const validateTask = (task: string) => {
    try {
      todoSchema.parse({ task });
      setError(null);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(e => e.message).join(", "));
      }
    }
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTask = e.target.value;
    setTask(newTask);
    validateTask(newTask);
  };

  const handleTaskBlur = (e: FocusEvent<HTMLInputElement>) => {
    setError(null);
  };

  const handleTaskSubmit = async () => {
    try {
      todoSchema.parse({ task });
      mutate({ task });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(e => e.message).join(", "));
      } else {
        console.error("Error adding task:", error);
        toast.error("Error adding task");
      }
    }
  };

  return (
    <div className="add-todo p-4 bg-white shadow-md rounded-lg mb-4 mt-4 flex-grow max-w-4xl mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
      <input
        type="text"
        value={task}
        onChange={handleTaskChange}
        onBlur={handleTaskBlur}
        placeholder="Add a new task"
        className="add-todo-input flex-grow focus:outline-none focus:border-none w-full sm:w-auto"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button onClick={handleTaskSubmit} className="add-todo-button mt-2 w-full flex justify-start">
        <div className="flex items-center justify-center">
          <FaPlus className="icon-white mr-2"/> Add task
        </div>
      </button>
      <ToastContainer/>
    </div>
  );
};

export default AddTodo;
