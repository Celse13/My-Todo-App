"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { todoSchema } from "@/database/schema";

// const todoActions = {
//     async getTodos() {
//         return await db.select().from(todoSchema);
//     },
//
//     async getTodoById(id: string) {
//         return await db.select().from(todoSchema).where(eq(todoSchema.id, id));
//     },
//
//     async createTodo(text: string) {
//         await db.insert(todoSchema).values({ text });
//         revalidatePath("/");
//     },
//
//     async updateTodo(id: string, text: string, done: boolean) {
//         await db.update(todoSchema).set({ text, done }).where(eq(todoSchema.id, id));
//         revalidatePath("/");
//     },
//
//     async deleteTodo(id: string) {
//         await db.delete(todoSchema).where(eq(todoSchema.id, id));
//         revalidatePath("/");
//     }
// };
//
// export { todoActions };



export const createTodo = async (id: number, task: string) => {
    await db.insert(todoSchema).values({
        id: id,
        task: task,
    });
};
