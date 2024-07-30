"use client";

import { useState, useEffect } from "react";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import Aside from "@/components/Aside";
import { FaUserCircle } from "react-icons/fa";
import { todoType } from "@/types/todoType";
import { createTodo, getTodos } from "@/actions/todoActions";
import { editTodo as editTodoOnServer } from "@/actions/todoActions";
import { deleteTodo as deleteTodoOnServer } from "@/actions/todoActions";

import { ClipLoader } from "react-spinners";

interface HomeProps {
  initialTodos: todoType[];
}

export default function Home({ initialTodos }: HomeProps) {
  const [todos, setTodos] = useState<todoType[]>(initialTodos);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDb = await getTodos();
      setTodos(todosFromDb);
      setLoading(false);
    };
    fetchTodos();
  }, []);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const addTodo = async (task: string) => {
    setIsCreating(true);
    try {
      const newTodo = await createTodo(task);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsCreating(false);
    }
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

  const confirmDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setShowConfirmDialog(true);
  };

  const deleteTodo = async () => {
    if (!todoToDelete) return;
    setIsDeleting(true);
    setShowConfirmDialog(false);
    try {
      await deleteTodoOnServer(todoToDelete);
      setTodos(todos.filter(todo => todo.id !== todoToDelete));
      setDeletionMessage("Task deleted successfully.");
      setTimeout(() => setDeletionMessage(null), 3000);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsDeleting(false);
      setTodoToDelete(null);
    }
  };

  const editTodo = async (id: string, newTask: string) => {
    try {
      await editTodoOnServer(id, newTask);
      setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newTask } : todo));
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  const startTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, inProgress: !todo.inProgress } : todo));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

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
              {deletionMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> {deletionMessage}</span>
                </div>
              )}
              {isCreating && (
                <div className="flex justify-center items-center mb-4">
                  <ClipLoader size={30} color={"#123abc"} loading={true} />
                </div>
              )}
              {isDeleting && (
                <div className="flex justify-center items-center mb-4">
                  <ClipLoader size={30} color={"#123abc"} loading={true} />
                </div>
              )}
              <TodoList
                todos={todos}
                changeTodoTask={changeTodoTask}
                changeTodoCompleted={changeTodoCompleted}
                deleteTodo={confirmDeleteTodo}
                editTodo={editTodo}
                startTodo={startTodo}
              />
            </div>
          </section>
        </div>
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={deleteTodo}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
