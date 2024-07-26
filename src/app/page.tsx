// src/app/page.tsx
"use client"; // Add this directive at the top

import "./styles.css"; // Import the CSS file
import Image from "next/image";
import AddTodo from "@/components/AddTodo";
import Todo from "@/components/Todo";
import TaskModal from "@/components/TaskModal";
import { useState } from "react";
import { todoType } from "@/types/todoType";
import todoAppImage from "@/public/todo-app.jpg";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { format } from 'date-fns';
import { FaPlus } from "react-icons/fa";

export default function Home() {
    const [todos, setTodos] = useState<todoType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addTodo = (task: string, description: string) => {
        const newTodo = { id: Date.now().toString(), title: "", description, task, completed: false, inProgress: false };
        setTodos([...todos, newTodo]);
    };

    const changeTodoTask = (id: string, task: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task } : todo));
    };

    const changeTodoCompleted = (id: string, completed: boolean) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
    };

    const changeTodoInProgress = (id: string, inProgress: boolean) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, inProgress } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, newTitle: string, newDescription: string, newTask: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: newTitle, description: newDescription, task: newTask } : todo));
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

    const today = new Date();
    const dayName = format(today, 'eeee'); // get the day of the week

    return (
        <main className="flex flex-col min-h-screen">
            <nav className="navbar">
                <div className="navbar-title">My Todo App</div>
                <div className="navbar-buttons">
                    <button className="navbar-button">Login</button>
                    <button className="navbar-button">Sign Up</button>
                </div>
            </nav>
            <div className="flex-grow flex">
                <aside className="aside">
                    <h2 className="aside-title">My Todo App</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="aside-input"
                        />
                        <button className="aside-button" onClick={() => setIsModalOpen(true)}>
                            <FaPlus className="icon-white"/> Add task
                        </button>
                        <button className="aside-button">In progress</button>
                        <button className="aside-button">Completed</button>
                    </div>
                </aside>
                <div className="main-content">
                <header className="main-header">
                        <h1 className="main-title">{dayName === format(new Date(), 'eeee') ? 'Today' : dayName}</h1>
                        <p className="main-subtitle">Manage your tasks efficiently</p>
                    </header>
                    <section className="todo-section">
                        <div className="flex-grow">
                            <AddTodo addTodo={addTodo}/>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="todos">
                                    {(provided) => (
                                        <div className="todo-list" {...provided.droppableProps}
                                             ref={provided.innerRef}>
                                            {todos.map((todo, index) => (
                                                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            className="todo-item">
                                                            <Todo
                                                                todo={todo}
                                                                changeTodoTask={changeTodoTask}
                                                                changeTodoCompleted={changeTodoCompleted}
                                                                deleteTodo={deleteTodo}
                                                                editTodo={editTodo}
                                                                startTodo={startTodo}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </section>
                </div>
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTask={addTodo}
            />
        </main>
    );
}
