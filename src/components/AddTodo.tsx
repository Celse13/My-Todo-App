import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import { addTodo } from "@/components/hooks/TodoQueries";

const AddTodo = () => {
    const [task, setTask] = useState("");
    const queryClient = useQueryClient();

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            toast.success('Task added successfully');
            setTask('');
        },
        onError: () => {
            toast.error('Error adding task');
        },
    });

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = async () => {
        try {
            await addTodoMutation(task);
        } catch (error: any) {
            console.log(error.message)
        }
    };

    return (
        <div className="add-todo flex justify-center items-center">
            <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                placeholder="Add a new task"
                className="add-todo-input flex-grow focus:outline-none focuse:border-none"
            />
            <button onClick={handleTaskSubmit} className="add-todo-button">
                <div className="flex items-center">
                    <FaPlus className="icon-white mr-2"/> Add task
                </div>
            </button>
            <ToastContainer/>
        </div>
    );
};

export default AddTodo;