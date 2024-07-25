"use client";
import Image from "next/image";
import AddTodo from "@/components/AddTodo";
import Todo from "@/components/Todo";
import { useState } from "react";
import { todoType } from "@/types/todoType";

export default function Home() {
    const [todos, setTodos] = useState<todoType[]>([]);

    const addTodo = (task: string) => {
        const newTodo = { id: Date.now().toString(), task, completed: false };
        setTodos([...todos, newTodo]);
    };

    const changeTodoTask = (id: string, task: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task } : todo));
    };

    const changeTodoCompleted = (id: string, completed: boolean) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
            <header className="w-full text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">My Task</h1>
                <p className="text-lg text-gray-600">Manage your tasks efficiently</p>
            </header>
            <section className="w-full max-w-md">
                <AddTodo addTodo={addTodo} />
                <div className="todo-list mt-4">
                    {todos.map(todo => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            changeTodoTask={changeTodoTask}
                            changeTodoCompleted={changeTodoCompleted}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </div>
            </section>
            <footer className="w-full text-center mt-8 text-gray-500">
                <p>&copy; 2024 My Todo App. All rights reserved.</p>
            </footer>
        </main>
    );
}
