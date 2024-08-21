"use server";

import { eq, not } from "drizzle-orm";
import db from "@/database/drizzle";
import {todos} from "@/database/schema";
import {todoType} from "@/types/todoType";
import {auth} from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function getTodoById(id: string) {
    return await db.query.todos.findFirst({ where: eq(todos.userId, id) });
}

export const getTodoId = async (id: number) => {
    return await db.query.todos.findFirst({ where: eq(todos.id, id) });
}

export const getTodos = async (id: string)=> {
  const data = await db.select().from(todos).where(eq(todos.userId, id));
  return data;
};



export const createTodo = async (task: string) => {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/");
  }
  await db.insert(todos).values({
        task,
        userId: session?.user?.id,
        completed: false,
        inProgress: false,
  });
};


export const deleteTodo = async (id: number) => {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath("/todos");
};

export const updateTodo = async (id: number, task?: string)=> {
    if (!task) {
        throw new Error("Missing values to update");
    }
    const updates: Partial<{task: string}> = {};

    if (task) {
        updates.task = task;
    };

    await db.update(todos).set(updates).where(eq(todos.id, id));
    revalidatePath('/todos')
};


export const toggleTodoInProgress = async (id: number) => {
    await db
        .update(todos)
            .set({
                inProgress: not(todos.inProgress)
            })
            .where(eq(todos.id, id));
    revalidatePath("/");
};

export const toggleTodoCompletedStatus = async (id: number) => {
    await db
        .update(todos)
            .set({
                completed: not(todos.completed)
            })
            .where(eq(todos.id, id));
    revalidatePath("/");
};
