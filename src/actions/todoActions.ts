"use server";

import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { todos } from "@/database/schema";
import {todoType} from "@/types/todoType";

export const getTodos = async (userEmail: string): Promise<todoType[]> => {
  const todosFromDb = await db.select().from(todos).where(eq(todos.userEmail, userEmail));
  return todosFromDb.map(todo => ({
    id: todo.id,
    task: todo.task,
    completed: todo.completed,
    inProgress: todo.inProgress,
  }));
};

export const createTodo = async (task: string, userEmail: string) => {
  const newTodo = {
    id: uuidv4(),
    task,
    completed: false,
    inProgress: false,
    userEmail
  };
  await db.insert(todos).values(newTodo);
  return newTodo;
};


export const deleteTodo = async (id: string) => {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
};

export const editTodo = async (id: string, updates: Partial<{ task: string; completed: boolean }>) => {
  await db
      .update(todos)
      .set(updates)
      .where(eq(todos.id, id));
  revalidatePath("/");
};


export const toggleTodoInProgress = async (id: string, inProgress: boolean) => {
  await db
      .update(todos)
      .set({ inProgress })
      .where(eq(todos.id, id));
  revalidatePath("/");
};
