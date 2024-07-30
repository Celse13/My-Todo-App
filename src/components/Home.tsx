"use client";

import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import TaskModal from "@/components/TaskModal";
import Aside from "@/components/Aside";
import { useState } from "react";
import { todoType } from "@/types/todoType.ts";
import { FaUserCircle } from "react-icons/fa";

export default function Home() {
    const [todos, setTodos] = useState<todoType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAsideVisible, setIsAsideVisible] = useState(false);

    const toggleAside = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    const addTodo = async (task: string, description: string) => {
        const newTodo = { id: Date.now().toString(), task, completed: false };
        setTodos([...todos, newTodo]);
        await addTodoToDB(newTodo.id, task);
    };

    const changeTodoTask = (id: string, task: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task } : todo));
    };

    const changeTodoCompleted = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const changeTodoInProgress = (id: string, inProgress: boolean) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, inProgress } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, newTitle: string, newDescription: string, newTask: string) => {
        setTodos(todos.map(todo => todo.id === id ? {
            ...todo,
            title: newTitle,
            description: newDescription,
            task: newTask
        } : todo));
    };

    const startTodo = (id: string) => {
        changeTodoInProgress(id, true);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedTodos = Array.from(todos);
        const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, movedTodo);

        setTodos(reorderedTodos);
    };

    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex">
                <Aside isAsideVisible={isAsideVisible} toggleAside={toggleAside} />
                <div className={`main-content w-full ${isAsideVisible ? 'ml-64' : ''}`}>
                    <header className="main-header text-center mt-12">
                        <div className="flex flex-col justify-end items-center mb-4">
                            <FaUserCircle className="text-4xl mb-2" />
                            <span className="text-lg font-semibold">Celse Honore</span>
                        </div>
                        <h5 className="main-title text-2xl font-bold mt-4">MY TASKS</h5>
                    </header>
                    <section className="flex mx-auto w-3/4 bg-white rounded-lg p-6 shadow-md justify-center items-center">
                        <div className="flex-grow max-w-4xl mx-auto">
                            <AddTodo addTodo={addTodo} />
                            <TodoList
                                todos={todos}
                                changeTodoTask={changeTodoTask}
                                changeTodoCompleted={changeTodoCompleted}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                startTodo={startTodo}
                                onDragEnd={onDragEnd}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
