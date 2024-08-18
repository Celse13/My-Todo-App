"use server";

import { v4 as uuidv4 } from 'uuid';
import { eq } from "drizzle-orm";
import db from "@/database/drizzle";
import { todos } from "@/database/schema";
import {todoType} from "@/types/todoType";

export const getTodos = async (id: string): Promise<todoType[]> => {
  const todosFromDb = await db.select().from(todos).where(eq(todos.userId, id));
  return todosFromDb.map(todo => ({
    id: todo.id,
    task: todo.task,
    completed: todo.completed,
    inProgress: todo.inProgress,
    userId: todo.userId,
  }));
};

export const createTodo = async (task: string, userId: string) => {
  const newTodo = {
    id: uuidv4(),
    task,
    userId,
    completed: false,
    inProgress: false,
  };
  return await db.insert(todos).values(newTodo);
};


export const deleteTodo = async (id: string) => {
  return await db.delete(todos).where(eq(todos.id, id));
};

export const editTodo = async (id: string, task: string): Promise<{ task: string }> => {
  await db.update(todos).set({ task }).where(eq(todos.id, id));
  const updatedTodo = await getTodoById(id);
  return updatedTodo!;
};


export const editTodoStatus = async (id: string, updates: Partial<{ completed: boolean }>) => {
  return (await db
      .update(todos)
      .set(updates)
      .where(eq(todos.id, id)));
};


export const toggleTodoInProgress = async (id: string, inProgress: boolean) => {
  return (await db
      .update(todos)
      .set({ inProgress })
      .where(eq(todos.id, id)));
};

export const getTodoById = async (id: string): Promise<todoType | null> => {
  const result = await db.select().from(todos).where(eq(todos.id, id));
  return result.length ? result[0] : null;
};
