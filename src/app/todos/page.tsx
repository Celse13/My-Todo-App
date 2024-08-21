"use client";

import { useState } from "react";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function ClientComponent() {
  const [deletionMessage, setDeletionMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const { data, status } = useSession();


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
    <main className="flex flex-col ">
      <Navbar/>
        <div className={"main-content w-full"}>
          <header className="main-header text-center mt-12">
            <h5 className="main-title text-2xl font-bold mt-4">MY TASKS</h5>
          </header>
          <AddTodo />
          <TodoList />
      </div>
    </main>
  );
}
