"use server";

import { v4 as uuidv4 } from 'uuid';
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { todoSchema } from "@/database/todoSchema";

export const getTodos = async () => {
  const data = await db.select().from(todoSchema);
  return data;
};

export const createTodo = async (task: string) => {
  const newTodo = {
    id: uuidv4(),
    task,
    completed: false,
  };
  await db.insert(todoSchema).values(newTodo);
  revalidatePath("/");
  return newTodo;
};


export const deleteTodo = async (id: string) => {
  await db.delete(todoSchema).where(eq(todoSchema.id, id));
  revalidatePath("/");
};

export const editTodo = async (id: string, updates: Partial<{ task: string; completed: boolean }>) => {
  await db
      .update(todoSchema)
      .set(updates)
      .where(eq(todoSchema.id, id));
  revalidatePath("/");
};
