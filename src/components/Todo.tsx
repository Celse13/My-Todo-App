"use client";
import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/types/todoType";

interface Props {
    todo: todoType;
    changeTodoTask: (id: string, task: string) => void;
    changeTodoCompleted: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

const Todo: FC<Props> = ({ todo, changeTodoTask, changeTodoCompleted, deleteTodo }) => {
    const [task, setTask] = useState(todo.task);
    const [isEditing, setIsEditing] = useState(false);

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleTaskSubmit = () => {
        changeTodoTask(todo.id, task);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => changeTodoCompleted(todo.id, !todo.completed)}
                className="todo-checkbox"
            />
            {isEditing ? (
                <input
                    type="text"
                    value={task}
                    onChange={handleTaskChange}
                    onBlur={handleTaskSubmit}
                    autoFocus
                    className="todo-input"
                />
            ) : (
                <span onClick={() => setIsEditing(true)} className="todo-task">
                    {task}
                </span>
            )}
            <button onClick={() => deleteTodo(todo.id)} className="todo-delete">
                &times;
            </button>
        </div>
    );
};

export default Todo;
