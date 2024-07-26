import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { todoSchema } from "@/database/schema";

const todoActions = {
    async getTodos() {
        return await db.select().from(todoSchema).execute();
    },

    async getTodoById(id: string) {
        return await db.select().from(todoSchema).where(eq(todoSchema.id, id)).execute();
    },

    async createTodo(text: string) {
        await db.insert(todoSchema).values({ text }).execute();
        revalidatePath("/");
    },

    async updateTodo(id: string, text: string, done: boolean) {
        await db.update(todoSchema).set({ text, done }).where(eq(todoSchema.id, id)).execute();
        revalidatePath("/");
    },

    async deleteTodo(id: string) {
        await db.delete(todoSchema).where(eq(todoSchema.id, id)).execute();
        revalidatePath("/");
    }
};

export { todoActions };
