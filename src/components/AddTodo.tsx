"use client";
import { ChangeEvent, FC, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import { createTodo } from "@/actions/todoActions";

interface Props {
    addTodo: (task: string) => void;
}

const AddTodo: FC<Props> = ({ addTodo }) => {
    const [task, setTask] = useState("");

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = async () => {
        if (task.trim()) {
            try {
                const id = Date.now();
                // const newTodo = await createTodo(id, task);
                addTodo(newTodo.task);
                setTask("");
                toast.success("Task added successfully!");
            } catch (error) {
                toast.error("Failed to add task.");
            }
        }
    }

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
