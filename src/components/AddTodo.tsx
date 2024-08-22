import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import { addTodo } from "@/components/hooks/TodoQueries";
import { todoSchema } from "@/lib/todoSchema";
import { z } from "zod";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const queryClient = useQueryClient();

  const { mutate }  = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task added successfully');
      setTask('');
    },
    onError: (error: any) => {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
    },
  });

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = async () => {
    try {
      // Validate the task using zod schema
      todoSchema.parse({ task });
      mutate({ task });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error("Validation failed", error.errors);
        toast.error("Task validation failed: " + error.errors.map(e => e.message).join(", "));
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
            placeholder="Add a new task"
            className="add-todo-input flex-grow focus:outline-none focus:border-none w-full sm:w-auto"
        />
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
