import React from "react";
import Todo from "@/components/Todo";
import { FaPlay, FaTrash } from "react-icons/fa";
import { todoType } from "@/types/todoType";

interface TodoListProps {
    todos: todoType[];
    changeTodoTask: (id: string, task: string) => void;
    changeTodoCompleted: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, newTask: string) => void;
    startTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos = [],
    changeTodoTask,
    changeTodoCompleted,
    deleteTodo,
    editTodo,
    startTodo
}) => {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                    <Todo
                        todo={todo}
                        changeTodoTask={changeTodoTask}
                        changeTodoCompleted={changeTodoCompleted}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        startTodo={startTodo}
                    />
                    <div className="todo-controls">
                        <button className="todo-button todo-start" onClick={() => startTodo(todo.id)}>
                            <FaPlay />
                        </button>
                        <button className="todo-button todo-delete" onClick={() => deleteTodo(todo.id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
