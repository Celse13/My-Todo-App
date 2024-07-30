"use server";

import { v4 as uuidv4 } from 'uuid';
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { todoSchema } from "@/database/schema";

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
  // Assuming `db` is your database instance and `todoSchema` is your table schema
  await db.insert(todoSchema).values(newTodo);
  return newTodo;
};


export const deleteTodo = async (id: string) => {
  await db.delete(todoSchema).where(eq(todoSchema.id, id));
  revalidatePath("/");
};

export const editTodo = async (id: string, task: string) => {
  await db
    .update(todoSchema)
    .set({
      task: task,
    })
    .where(eq(todoSchema.id, id));
  revalidatePath("/");
};
