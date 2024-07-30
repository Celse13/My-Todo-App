"use client";
import { ChangeEvent, useState } from "react";
import { todoType } from "@/types/todoType";
import { FaTrash, FaEdit, FaPlay, FaPause } from "react-icons/fa";

interface Props {
    todo: todoType;
    changeTodoTask: (id: string, task: string) => void;
    changeTodoCompleted: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, newTask: string) => void;
    startTodo: (id: string) => void;
}

const Todo = ({ todo, changeTodoTask, changeTodoCompleted, deleteTodo, editTodo, startTodo }: Props) => {
    const [task, setTask] = useState(todo.task);
    const [isEditing, setIsEditing] = useState(false);

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = () => {
        editTodo(todo.id, task);
        setIsEditing(false);
    };

    const handleStartPauseClick = () => {
        startTodo(todo.id);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg mb-4 mt-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        checked={todo.completed}
                        onChange={() => changeTodoCompleted(todo.id, !todo.completed)}
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
                    <button className="todo-button todo-delete" onClick={() => deleteTodo(todo.id)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todo;
