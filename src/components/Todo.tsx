// src/components/Todo.tsx
"use client";
import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/types/todoType.ts";
import { FaTrash, FaEdit, FaPlay } from "react-icons/fa"; // Import the icons from react-icons

interface Props {
    todo: todoType;
    changeTodoTask: (id: string, task: string) => void;
    changeTodoCompleted: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, newTask: string) => void;
    startTodo: (id: string) => void;
}
const Todo: FC<Props> = ({ todo, changeTodoTask, changeTodoCompleted, deleteTodo, editTodo, startTodo }) => {
    const [task, setTask] = useState(todo.task);
    const [isEditing, setIsEditing] = useState(false);

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = () => {
        editTodo(todo.id, task);
        setIsEditing(false);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4">
            <div className="flex items-center mb-2">
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
                            className="todo-input border rounded px-2 py-1"
                        />
                    ) : (
                        <span onClick={() => setIsEditing(true)} className="todo-task cursor-pointer mr-4">
                            {task}
                        </span>
                    )}
                </div>
                {todo.inProgress && <span className="text-yellow-500 ml-4">In Progress</span>}
            </div>
        </div>
    );
};


export default Todo;
