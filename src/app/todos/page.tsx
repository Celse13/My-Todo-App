"use client"

import { useState } from "react";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import Aside from "@/components/Aside";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ClientComponent() {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const { data, status } = useSession();

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const confirmDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setShowConfirmDialog(true);
  };

  const deleteTodo = async (): Promise<void> => {
    if (!todoToDelete) return;
    setShowConfirmDialog(false);
    setTodoToDelete(null);
    return Promise.resolve();
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex">
        <Aside isAsideVisible={isAsideVisible} toggleAside={toggleAside} />
        <div className={`main-content w-full ${isAsideVisible ? 'ml-64' : ''}`}>
          <header className="main-header text-center mt-12">
            <div className="flex flex-col justify-end items-center mb-4">
              <FaUserCircle className="text-4xl mb-2" />
              <span className="text-lg font-semibold">{data?.user?.name?.split(" ")[1]}</span>
            </div>
            <h5 className="main-title text-2xl font-bold mt-4">MY TASKS</h5>
          </header>
          <section className="flex mx-auto w-3/4 bg-white rounded-lg p-6 shadow-md justify-center items-center">
            <div className="flex-grow max-w-4xl mx-auto">
              <AddTodo />
              {deletionMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> {deletionMessage}</span>
                </div>
              )}
              <TodoList
                changeTodoTask={async (id: string, task: string) => {}}
                changeTodoCompleted={async (id: string) => {}}
                deleteTodo={async (id: string) => confirmDeleteTodo(id)}
                editTodo={async () => {}}
                startTodo={async () => {}}
                changeTodoInProgress={async (id: string, inProgress: boolean) => {}}
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
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={deleteTodo}>
                Delete
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
